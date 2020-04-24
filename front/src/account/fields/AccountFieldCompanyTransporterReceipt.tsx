import React from "react";
import gql from "graphql-tag";
import AccountField from "./AccountField";
import { Company } from "../AccountCompany";
import AccountFormCompanyTransporterReceipt from "./forms/AccountFormCompanyTransporterReceipt";

type Props = {
  company: Pick<Company, "id" | "siret" | "transporterReceipt">;
};

AccountFieldCompanyTransporterReceipt.fragments = {
  company: gql`
    fragment AccountFieldCompanyTransporterReceiptFragment on CompanyPrivate {
      id
      siret
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
  return (
    <AccountField
      name="transporterReceipt"
      label="Récépissé transporteur"
      value={company.transporterReceipt?.receiptNumber}
      renderForm={(toggleEdition) => (
        <AccountFormCompanyTransporterReceipt
          company={company}
          toggleEdition={toggleEdition}
        />
      )}
    />
  );
}
