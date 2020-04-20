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
        <div className={styles.field}>
          <label className="text-right">Numéro de récépissé</label>
          <div className={styles.field__value}>
            <Field type="text" name="transporterReceiptNumber" />
            <RedErrorMessage name="transporterReceiptNumber" />
          </div>
        </div>
        <div className={styles.field}>
          <label className="text-right">Limite de validité</label>
          <div className={styles.field__value}>
            <Field type="date" name="transporterReceiptValidity" />
            <RedErrorMessage name="transporterReceiptValidity" />
          </div>
        </div>
        <div className={styles.field}>
          <label className="text-right">Département</label>
          <div className={styles.field__value}>
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
