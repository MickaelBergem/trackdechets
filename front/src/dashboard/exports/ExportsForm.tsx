import React from "react";
import gql from "graphql-tag";
import { Formik, Form, Field } from "formik";
import DateInput from "../../form/custom-inputs/DateInput";
import styles from "./ExportsForms.module.scss";
import {
  CompanyPrivate,
  FormsRegisterExportType,
} from "../../generated/graphql/types";
import WasteTreeModal from "../../search/WasteTreeModal";

interface IProps {
  companies: CompanyPrivate[];
}

ExportsForm.fragments = {
  company: gql`
    fragment ExportsFormCompanyFragment on CompanyPrivate {
      siret
      name
      givenName
    }
  `,
};

export default function ExportsForm({ companies }: IProps) {
  const now = new Date();

  const initialValues = {
    exportType: FormsRegisterExportType.Outgoing,
    startDate: new Date(now.getFullYear(), 0, 1),
    endDate: now,
    company: "",
    wasteCode: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form className="tw-m-0">
        <div className="tw-grid tw-justify-center tw-grid-cols-3 tw-gap-6">
          <label className="tw-col-span-1 tw-text-right tw-flex tw-items-center tw-justify-end tw-font-bold">
            Déchets entrants / sortants
          </label>
          <Field
            className="tw-col-span-2 max-w-md"
            name="exportType"
            as="select"
          >
            <option value={FormsRegisterExportType.Outgoing}>
              Déchets sortants
            </option>
            <option value={FormsRegisterExportType.Incoming}>
              Déchets entrants
            </option>
          </Field>
          <label className="tw-col-span-1 tw-text-right tw-flex tw-items-center tw-justify-end tw-font-bold">
            Date de début
          </label>
          <Field
            className={`tw-col-span-2 ${styles["max-w-xxs"]}`}
            name="startDate"
            component={DateInput}
          ></Field>
          <label className="tw-col-span-1 tw-text-right tw-flex tw-items-center tw-justify-end tw-font-bold">
            Date de fin
          </label>
          <Field
            className={`tw-col-span-2 ${styles["max-w-xxs"]}`}
            name="endDate"
            component={DateInput}
          ></Field>
          <label className="tw-col-span-1 tw-text-right tw-flex tw-items-center tw-justify-end tw-font-bold">
            Établissement
          </label>
          <Field as="select" name="company" className="tw-col-span-2 max-w-md">
            {companies.map((company, key) => (
              <option value={company.siret} key={key}>
                {company.givenName || company.name}
              </option>
            ))}
          </Field>
          <label className="tw-col-span-1 tw-text-right tw-flex tw-items-center tw-justify-end tw-font-bold">
            Type de registre
          </label>
          <Field
            as="select"
            name="registerType"
            className="tw-col-span-2 max-w-md"
          >
            <option value="Exhaustif">Exhaustif</option>
            <option value="Producteur">Producteur</option>
          </Field>
          <label className="tw-col-span-1 tw-text-right tw-flex tw-items-center tw-justify-end tw-font-bold">
            Code déchet (optionnel)
          </label>

          {/* <WasteTreeModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSelect={(codes) => setWasteCode(codes[0])}
          /> */}
        </div>
      </Form>
    </Formik>
  );
}
