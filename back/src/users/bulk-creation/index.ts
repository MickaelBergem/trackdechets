import parseArgs from "minimist";
import { prisma } from "../../generated/prisma-client";
import { loadCompanies, loadRoles } from "./loaders";
import { validateCompany, validateRoleGenerator } from "./validations";
import { sirenify } from "./sirene";
import { hashPassword } from "../utils";
import { randomNumber, getUIBaseURL } from "../../utils";
import { acceptNewUserCompanyInvitations } from "../mutations/signup";
import { associateUserToCompany } from "../mutations/associateUserToCompany";
import { groupBy } from "./utils";
import { sendMail } from "../../common/mails.helper";
import { UserInputError } from "apollo-server-express";

function printHelp() {
  console.log(`
  Usage npm run bulk-create-account [options]

  Bulk load a list of companies and users to Trackdéchets
  Two csv files are required
  * etablissements.csv
  * roles.csv

  See validations.ts for the format of each file

  Options:

  -- --help                       Print help
  -- --validateOnly               Only perform validation csv files
  -- --csvDir=/path/to/csv/dir    Specify custom csv directory
  `);
}

async function run(argv = process.argv.slice(2)): Promise<void> {
  const args = parseArgs(argv);

  if (args.help) {
    printHelp();
  }

  const opts = {
    validateOnly: false,
    csvDir: `${__dirname}/../../../csv`
  };

  if (args.validateOnly) {
    opts.validateOnly = args.validateOnly;
    console.info("Running csv validations only...");
  }

  if (args.csvDir) {
    opts.csvDir = args.csvDir;
  }

  await bulkCreate(opts);
}

interface Opts {
  validateOnly: boolean;
  csvDir: string;
  console?: any;
}

export async function bulkCreate(opts: Opts): Promise<void> {
  console = opts.console || global.console;

  // load data from csv files
  const companiesRows = await loadCompanies(opts.csvDir);
  const rolesRows = await loadRoles(opts.csvDir);

  let isValid = true;

  // validate companies
  const companiesPromises = companiesRows.map(company =>
    validateCompany(company).catch(err => {
      isValid = false;
      console.error(err);
    })
  );
  let companies = await Promise.all(companiesPromises);

  // validate roles
  const validateRole = validateRoleGenerator(companies);
  const rolesPromises = rolesRows.map(role => {
    return validateRole(role).catch(err => {
      isValid = false;
      console.error(err);
    });
  });
  const roles = await Promise.all(rolesPromises);

  if (isValid) {
    console.info("Validation successful");
  }

  if (opts.validateOnly) {
    process.exit(0);
  }

  if (!isValid) {
    // trying to load data but validation failed
    // exit with error
    process.exit(1);
  }

  // add name and codeNaf to companies
  companies = await Promise.all(
    companies.map(c => {
      return sirenify(c);
    })
  ).catch(err => {
    console.error(err);
    process.exit(1);
  });

  // create companies in Trackdéchets

  await Promise.all(
    companies.map(async company => {
      const existingCompany = await prisma.company({ siret: company.siret });
      if (!existingCompany) {
        return prisma.createCompany({
          siret: company.siret,
          codeNaf: company.codeNaf,
          gerepId: company.gerepId,
          name: company.name,
          companyTypes: { set: company.companyTypes },
          securityCode: randomNumber(4),
          givenName: company.givenName,
          contactEmail: company.contactEmail,
          contactPhone: company.contactPhone,
          website: company.website
        });
      }
    })
  );

  // group roles by email
  const usersWithRoles = groupBy("email", roles);

  await Promise.all(
    Object.keys(usersWithRoles).map(async email => {
      // check for existing user
      let user = await prisma.user({ email });

      let newUser = null;

      if (!user) {
        // No user matches this email. Creates a new one
        const password = Math.random()
          .toString(36)
          .slice(-10);

        const hashedPassword = await hashPassword(password);

        user = await prisma.createUser({
          name: email,
          email,
          password: hashedPassword,
          isActive: true
        });

        await acceptNewUserCompanyInvitations(user);

        newUser = { password };
      }

      const associations = await Promise.all(
        usersWithRoles[email].map(async ({ role, siret }) => {
          try {
            return await associateUserToCompany(user.id, siret, role);
          } catch (err) {
            if (err instanceof UserInputError) {
              // association already exist, return it
              const existingAssociations = await prisma.companyAssociations({
                where: { company: { siret }, user: { id: user.id } }
              });
              return existingAssociations[0];
            }

            console.error(err);
          }
        })
      );

      if (newUser) {
        // send welcome email to new user
        const mail = {
          to: [{ name: email, email }],
          subject: "Bienvenue sur Trackdéchets",
          title: "Bienvenue sur Trackdéchets",
          body: `
          Bonjour,
          <br/>
          Vous avez été invité à rejoindre Trackdéchets: la plateforme de dématérialisation
          des bordereaux de suivi de déchets dangereux.
          <br/>
          Vous pouvez-vous connecter à votre compte sur ${getUIBaseURL()}/login avec les identifiants suivants:
          <br /><br />
          email: ${email}
          <br/>
          mot de passe provisoire: ${newUser.password}
        `
        };

        try {
          await sendMail(mail);
        } catch (err) {
          console.error("Error while sending invitation email");
        }
      }

      return associations;
    })
  );
}

if (require.main === module) {
  run().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
