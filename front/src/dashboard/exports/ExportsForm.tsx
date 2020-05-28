import React, { useState } from "react";
import gql from "graphql-tag";
import { Formik, Form, Field } from "formik";
import DateInput from "../../form/custom-inputs/DateInput";
import styles from "./ExportsForms.module.scss";
import {
  CompanyPrivate,
  FormsRegisterExportType,
} from "../../generated/graphql/types";
import WasteTreeModal from "../../search/WasteTreeModal";
import { wasteCodeValidator } from "../../form/waste-code/waste-code.validator";

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
  const [openWasteTreeModal, setOpenWasteTreeModal] = useState(false);

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
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="tw-m-0">
          <div className="tw-grid tw-justify-center tw-grid-cols-3 tw-gap-6">
            <label className="tw-col-span-1 tw-text-right tw-flex tw-items-center tw-justify-end tw-font-bold">
              Déchets entrants / sortants
            </label>
            <Field
              className="tw-col-span-2 tw-max-w-md"
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
            <Field
              as="select"
              name="company"
              className="tw-col-span-2 max-w-md"
            >
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
              className="tw-col-span-2 tw-max-w-md"
            >
              <option value="Exhaustif">Exhaustif</option>
              <option value="Producteur">Producteur</option>
            </Field>
            <label className="tw-col-span-1 tw-text-right tw-flex tw-items-center tw-justify-end tw-font-bold">
              Code déchet (optionnel)
            </label>
            <div className="tw-col-span-2 tw-max-w-md">
              <div className="tw-container tw-flex tw-flex-row">
                <Field
                  name="wasteCode"
                  className={`${styles["max-w-xxs"]} tw-mr-4`}
                  validate={wasteCodeValidator}
                ></Field>
                <button
                  className={`button-outline primary small tw-text-xs ${styles["max-w-xxs"]} tw-mr-4`}
                  onClick={() => setOpenWasteTreeModal(true)}
                >
                  Liste des codes déchets
                </button>
              </div>
            </div>
            <div className="tw-col-span-1"></div>
            <div className="tw-col-span-2">
              Suspensions aqueuses contenant de la peinture ou du vernis
              contenant des solvants organiques ou autres substances dangereuses
            </div>
            <WasteTreeModal
              open={openWasteTreeModal}
              onClose={() => setOpenWasteTreeModal(false)}
              onSelect={(codes) => setFieldValue("wasteCode", codes[0])}
            />
            <label className="tw-col-span-1 tw-text-right tw-flex tw-items-center tw-justify-end tw-font-bold">
              Type de registre
            </label>
            <Field
              as="select"
              name="registerType"
              className="tw-col-span-2 tw-max-w-md"
            >
              <option value="Exhaustif">Exhaustif</option>
              <option value="Producteur">Producteur</option>
            </Field>
          </div>

          <div className="tw-container tw-flex tw-flex-row-reverse tw-mt-5">
            <button type="submit" className="button tw-justify-end">
              Exporter
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
