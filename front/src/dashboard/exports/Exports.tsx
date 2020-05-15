import gql from "graphql-tag";
import React, { useState } from "react";
import DownloadFileLink from "../../common/DownloadFileLink";
import { User } from "../../generated/graphql/types";
import ExportsWizard from "./ExportsWizard";
import Modal from "../../common/Modal";
import { FormsRegisterExportType, Maybe } from "../../generated/graphql/types";

interface IProps {
  me: User;
}

const FORMS_REGISTER = gql`
  query FormsRegister($sirets: [String], $exportType: FormsRegisterExportType) {
    formsRegister(sirets: $sirets, exportType: $exportType) {
      downloadLink
    }
  }
`;

export default function Exports({ me }: IProps) {
  const companies = me.companies || [];

  const [sirets, setSirets] = useState(companies.map((c) => c.siret));

  const [displayWizard, setDisplayWizard] = useState(false);
  const [exportType, setExportType] = useState<Maybe<FormsRegisterExportType>>(
    null
  );

  function closeWizard() {
    setDisplayWizard(false);
    setExportType(null);
  }

  function openWizard(exportType: FormsRegisterExportType) {
    setDisplayWizard(true);
    setExportType(exportType);
  }

  return (
    <div className="main">
      <h2>Registre</h2>
      <p>
        Vous avez la possibilité de télécharger un registre des déchets entrants
        et sortants de votre entreprise. Cet export est un document CSV au
        format UTF-8. Assurez vous que vous l'ouvrez dans le bon format pour
        éviter les problèmes d'accents.
      </p>
      <button
        className="button"
        onClick={() => openWizard(FormsRegisterExportType.Incoming)}
      >
        Registre de déchets entrants
      </button>
      <button
        className="button"
        onClick={() => openWizard(FormsRegisterExportType.Outgoing)}
      >
        Registre de déchets sortants
      </button>

      {exportType && (
        <Modal display={displayWizard} close={() => closeWizard()}>
          <ExportsWizard
            exportType={exportType}
            onCancel={() => closeWizard()}
          />
        </Modal>
      )}

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
