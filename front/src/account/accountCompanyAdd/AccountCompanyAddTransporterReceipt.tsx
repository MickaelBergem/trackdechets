import React from "react";
import { Field } from "formik";
import RedErrorMessage from "../../common/RedErrorMessage";
import styles from "../AccountCompanyAdd.module.scss";

/**
 * Transporter receipt Formik fields for company creation
 */
export default function AccountCompanyAddTransporterReceipt() {
  return (
    <div className={styles.field}>
      <label className={`text-right ${styles.bold}`}>
        Récépissé Transporteur (optionnel)
      </label>
      <div className={styles.field__value}>
        <div>
          <label>Numéro de récépissé</label>
          <div>
            <Field type="text" name="transporterReceiptNumber" />
            <RedErrorMessage name="transporterReceiptNumber" />
          </div>
        </div>
        <div>
          <label>Limite de validité</label>
          <div>
            <Field type="date" name="transporterReceiptValidity" />
            <RedErrorMessage name="transporterReceiptValidity" />
          </div>
        </div>
        <div>
          <label>Département</label>
          <div>
            <Field
              type="text"
              name="transporterReceiptDepartment"
              placeholder="75"
            />
            <RedErrorMessage name="transporterReceiptDepartment" />
          </div>
        </div>
      </div>
    </div>
  );
}
