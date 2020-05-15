import React from "react";
import { FormsRegisterExportType } from "../../generated/graphql/types";
import { Formik, Form, Field } from "formik";
import DateInput from "../../common/DateInput";

type Props = {
  exportType: FormsRegisterExportType;
  onCancel: () => void;
};

type Values = {
  startDate: string;
  endDate: string;
  sirets: string[];
  registerType: string;
  wasteCode: string;
  exportFormat: string;
};

export default function ExportsWizard({ exportType, onCancel }: Props) {
  const exportTypeLabel =
    exportType === FormsRegisterExportType.Incoming ? "entrants" : "sortants";

  const initialValues: Values = {
    startDate: "",
    endDate: "",
    sirets: [],
    registerType: "",
    wasteCode: "",
    exportFormat: "",
  };

  return (
    <div>
      <h2>Exporter un registre de déchets {exportTypeLabel}</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          console.log("submit");
        }}
      >
        <Form>
          <Field name="startDate" component={DateInput} />
          <Field name="endDate" component={DateInput} />
        </Form>
      </Formik>
      <div>
        <button className="button-outline primary" onClick={() => onCancel()}>
          Annuler
        </button>
        <button type="submit" className="button">
          Exporter
        </button>
      </div>
    </div>
  );
}
