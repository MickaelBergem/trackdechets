import gql from "graphql-tag";
import React from "react";
import { CompanyPrivate } from "../../generated/graphql/types";
import ExportsForm from "./ExportsForm";
import { filter } from "graphql-anywhere";

interface IProps {
  companies: CompanyPrivate[];
}

Exports.fragments = {
  company: gql`
    fragment ExportsCompanyFragment on CompanyPrivate {
      ...ExportsFormCompanyFragment
    }
    ${ExportsForm.fragments.company}
  `,
};

const FORMS_REGISTER = gql`
  query FormsRegister($sirets: [String], $exportType: FormsRegisterExportType) {
    formsRegister(sirets: $sirets, exportType: $exportType) {
      downloadLink
    }
  }
`;

export default function Exports({ companies }: IProps) {
  return (
    <div className="tw-p-6">
      <h2>Exporter un registre</h2>
      <p className="notification success">
        Vous avez la possibilité de télécharger un registre des déchets entrants
        et sortants de votre entreprise. Cet export est un document CSV au
        format UTF-8. Assurez vous que vous l'ouvrez dans le bon format pour
        éviter les problèmes d'accents.
      </p>
      <ExportsForm
        companies={filter(ExportsForm.fragments.company, companies)}
      />
      {/* {companies.length > 1 && (
        <p>
          Pour quelle entreprise(s) souhaitez vous télécharger le registre ?{" "}
          <select onChange={(evt) => setSirets([evt.target.value])}>
            <option value={companies.map((c) => c.siret)}>Toutes</option>
            {companies.map((c) => (
              <option value={c.siret} key={c.siret}>
                {c.name}
              </option>
            ))}
          </select>
        </p>
      )}
      <DownloadFileLink
        query={FORMS_REGISTER}
        params={{ sirets, exportType: "OUTGOING" }}
        className="button"
      >
        Registre de déchets sortants
      </DownloadFileLink>
      <DownloadFileLink
        query={FORMS_REGISTER}
        params={{ sirets, exportType: "INCOMING" }}
        className="button"
      >
        Registre de déchets entrants
      </DownloadFileLink> */}
    </div>
  );
}
