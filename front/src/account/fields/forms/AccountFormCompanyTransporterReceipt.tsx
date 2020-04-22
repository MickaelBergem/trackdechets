import React from "react";
import gql from "graphql-tag";
import { TransporterReceipt } from "../../AccountCompany";
import { useMutation } from "@apollo/react-hooks";
import { Formik, FormikProps, Form, Field } from "formik";
import styles from "./AccountFormCompanyTransporterReceipt.module.scss";
import RedErrorMessage from "../../../common/RedErrorMessage";

type Props = {
  name: string;
  siret: string;
  transporterReceipt: TransporterReceipt;
  toggleEdition: () => void;
};

type V = {
  receiptNumber: string;
  validityLimit: string;
  department: string;
};

export const UPDATE_TRANSPORTER_RECEIPT = gql`
  mutation UpdateTransporterReceipt($input: UpdateTransporterReceiptInput!) {
    updateTransporterReceipt(input: $input) {
      id
    }
  }
`;

export default function AccountFormCompanyTransporterReceipt({
  transporterReceipt,
  toggleEdition,
}) {
  const [update, { loading, error }] = useMutation(UPDATE_TRANSPORTER_RECEIPT, {
    onCompleted: () => {
      toggleEdition();
    },
  });

  const initialValues: V = {
    receiptNumber: transporterReceipt.receiptNumber,
    validityLimit: transporterReceipt.validityLimit,
    department: transporterReceipt.department,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {(props: FormikProps<V>) => (
        <Form>
          <div className={styles.field__value}>
            <div className={styles.field}>
              <label className="text-right">Numéro de récépissé</label>
              <div className={styles.field__value}>
                <Field type="text" name="receiptNumber" />
                <RedErrorMessage name="receiptNumber" />
              </div>
            </div>
            <div className={styles.field}>
              <label className="text-right">Limite de validité</label>
              <div className={styles.field__value}>
                <Field type="date" name="validityLimit" />
                <RedErrorMessage name="validityLimit" />
              </div>
            </div>
            <div className={styles.field}>
              <label className="text-right">Département</label>
              <div className={styles.field__value}>
                <Field type="text" name="department" placeholder="75" />
                <RedErrorMessage name="department" />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
