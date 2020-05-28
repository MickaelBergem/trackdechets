import { prisma } from "../../generated/prisma-client";
import {
  getCompanyActiveUsers,
  getCompanyInvitedUsers
} from "../../companies/queries/companyUsers";

const sirets = [
  "39128259700015",
  "34517948500031",
  "39933934000016",
  "31018842000023",
  "31018842000114",
  "31018842000031",
  "31018842000098",
  "33360111000013",
  "33360111000021",
  "39390306700014",
  "39390306700089",
  "33328490900020",
  "33328490900046",
  "38336924600046",
  "38336924600020",
  "40025889300017",
  "41808924900027",
  "45275129000019",
  "34445139800020",
  "34498486900026",
  "79345713600018",
  "79897955500017",
  "48803585800023",
  "38182489500019",
  "43973805500029",
  "39242361200010",
  "39242361200028",
  "49776352400038",
  "41895342800012"
];

async function deleteAccounts() {
  const startCompanyCount = await prisma
    .companiesConnection()
    .aggregate()
    .count();

  const startUserCount = await prisma
    .usersConnection()
    .aggregate()
    .count();

  const startFormCount = await prisma
    .formsConnection()
    .aggregate()
    .count();

  const companies = await prisma.companies({ where: { siret_in: sirets } });

  console.log("companies");
  companies.forEach(c => console.log(`${c.siret} - ${c.name}`));
  console.log("################");

  const usersArrayPromises = companies.map(c => {
    return getCompanyActiveUsers(c.siret);
  });

  const usersArray = await Promise.all(usersArrayPromises);

  const users = [];

  usersArray.forEach(arr => {
    arr.forEach(user => {
      if (users.map(u => u.email).indexOf(user.email) === -1) {
        users.push(user);
      }
    });
  });

  console.log("User");
  users.forEach(user => console.log(user.email));
  console.log("#################");

  const invitedUsersArrayPromise = companies.map(c => {
    return getCompanyInvitedUsers(c.siret);
  });

  const invitedUsersArray = await Promise.all(invitedUsersArrayPromise);

  const invitedUsers = [];

  invitedUsersArray.forEach(arr => {
    arr.forEach(user => {
      if (invitedUsers.map(u => u.email).indexOf(user.email) === -1) {
        invitedUsers.push(user);
      }
    });
  });

  const accessTokens = await prisma.accessTokens({
    where: { user: { id_in: users.map(u => u.id) } }
  });
  console.log("AccessToken");
  accessTokens.forEach(token => {
    console.log(token.id);
  });
  console.log("#################");

  console.log("UserAccountHashe");
  invitedUsers.forEach(user => console.log(user.email));
  console.log("#################");

  const associations = await prisma.companyAssociations({
    where: {
      company: { siret_in: companies.map(c => c.siret) },
      user: { id_in: users.map(u => u.id) }
    }
  });

  console.log("CompanyAssociation");
  associations.forEach(a => {
    console.log(`${a.id} - ${a.role}`);
  });
  console.log("##################");

  const userActivationHashesPromises = users.map(user => {
    return prisma.userActivationHashes({
      where: { user: { id: user.id } }
    });
  });

  const userActivationHashes = (await Promise.all(userActivationHashesPromises))
    .filter(hs => hs.length > 0)
    .map(hs => hs[0]);

  console.log("UserActivationHash");
  userActivationHashes.forEach(h => {
    console.log(h.id);
  });
  console.log("#################");

  const forms = await prisma.forms({
    where: {
      OR: [
        { owner: { id_in: users.map(u => u.id) } },
        { emitterCompanySiret_in: sirets },
        { recipientCompanySiret_in: sirets },
        { traderCompanySiret_in: sirets },
        { transporterCompanySiret_in: sirets }
      ]
    }
  });

  console.log("Form");
  forms.forEach(f =>
    console.log(`${f.readableId} - ${f.status} - ${f.createdAt}`)
  );

  const formOwnersPromises = forms.map(form =>
    prisma.form({ id: form.id }).owner()
  );

  console.log("FormOwner");
  const formOwners = (await Promise.all(formOwnersPromises)).filter(o => !!o);
  formOwners.forEach(owner => {
    console.log(owner.email);
  });

  // Status Logs
  const statusLogs = await prisma.statusLogs({
    where: {
      OR: [
        {
          form: {
            id_in: forms.map(f => f.id)
          }
        },
        { user: { id_in: users.map(u => u.id) } }
      ]
    }
  });

  console.log("StatusLog");
  statusLogs.forEach(l => {
    console.log(l.id);
  });
  console.log("##############");

  // delete status logs
  const deletedStatusLogs = await prisma.deleteManyStatusLogs({
    id_in: statusLogs.map(l => l.id)
  });

  console.log(`Deleted ${deletedStatusLogs.count} StatusLog`);

  // delete forms
  const deletedFormsPromises = forms.map(async form => {
    const owner = await prisma.form({ id: form.id }).owner();
    const deleteOwner = users.map(u => u.email).indexOf(owner.email) !== -1;

    if (deleteOwner) {
      // hard delete form
      return prisma.deleteForm({ id: form.id });
    } else {
      // soft delete form
      return prisma.updateForm({
        where: { id: form.id },
        data: {
          isDeleted: true
        }
      });
    }
  });

  const deletedForms = await Promise.all(deletedFormsPromises);

  console.log(`Deleted ${deletedForms.length} Form`);

  // delete user activation hashes
  const deletedUserActivationHashes = await prisma.deleteManyUserActivationHashes(
    {
      id_in: userActivationHashes.map(h => h.id)
    }
  );

  console.log(
    `Deleted ${deletedUserActivationHashes.count} UserActivationHash`
  );

  // delete company associations
  const deletedCompanyAssociation = await prisma.deleteManyCompanyAssociations({
    id_in: associations.map(a => a.id)
  });

  console.log(`Deleted ${deletedCompanyAssociation.count} CompanyAssociation`);

  // delete access tokens
  const deletedAccessTokens = await prisma.deleteManyAccessTokens({
    id_in: accessTokens.map(t => t.id)
  });

  console.log(`Deleted ${deletedAccessTokens.count} AccessToken`);

  // delete users;
  const deletedUsers = await prisma.deleteManyUsers({
    id_in: users.map(u => u.id)
  });

  console.log(`Deleted ${deletedUsers.count} User`);

  // delete companies
  const deletedCompanies = await prisma.deleteManyCompanies({
    id_in: companies.map(c => c.id)
  });

  console.log(`Deleted ${deletedCompanies.count} Company`);

  const endCompanyCount = await prisma
    .companiesConnection()
    .aggregate()
    .count();

  const endUserCount = await prisma
    .usersConnection()
    .aggregate()
    .count();

  const endFormCount = await prisma
    .formsConnection()
    .aggregate()
    .count();

  console.log(`Deleted ${startCompanyCount - endCompanyCount} companies`);
  console.log(`Deleted ${startUserCount - endUserCount} users`);

  console.log(`Deleted ${startFormCount - endFormCount} forms`);
}

deleteAccounts().then(() => process.exit());
