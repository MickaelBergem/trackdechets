import React from "react";
import gql from "graphql-tag";
import AccountField from "./AccountField";
import { Company } from "../AccountCompany";
import AccountFormCompanyTransporterReceipt from "./forms/AccountFormCompanyTransporterReceipt";

type Props = {
  company: Pick<Company, "transporterReceipt">;
};

AccountFieldCompanyTransporterReceipt.fragments = {
  company: gql`
    fragment AccountFieldCompanyTransporterReceiptFragment on CompanyPrivate {
      transporterReceipt {
        id
        receiptNumber
        validityLimit
        department
      }
    }
  `,
};

export default function AccountFieldCompanyTransporterReceipt({
  company,
}: Props) {
  if (company.transporterReceipt) {
    return (
      <AccountField
        name="transporterReceipt"
        label="Récépissé transporteur"
        value={company.transporterReceipt.receiptNumber}
        renderForm={(toggleEdition) => (
          <AccountFormCompanyTransporterReceipt
            transporterReceipt={company.transporterReceipt}
            toggleEdition={toggleEdition}
          />
        )}
      />
    );
  }
  return <div>Ajouter un récépissé</div>;
}
