import React from "react";
import { Field } from "formik";
import RedErrorMessage from "../../common/RedErrorMessage";
import styles from "../AccountCompanyAdd.module.scss";

/**
 * Trader receipt Formik fields for company creation
 */
export default function AccountCompanyAddTraderReceipt() {
  return (
    <div className={styles.field}>
      <label className={`text-right ${styles.bold}`}>
        Récépissé Négociant (optionnel)
      </label>
      <div className={styles.field__value}>
        <div className={styles.field}>
          <label className="text-right">Numéro de récépissé</label>
          <div className={styles.field__value}>
            <Field type="text" name="traderReceiptNumber" />
            <RedErrorMessage name="traderReceiptNumber" />
          </div>
        </div>
        <div className={styles.field}>
          <label className="text-right">Limite de validité</label>
          <div className={styles.field__value}>
            <Field type="date" name="traderReceiptValidity" />
            <RedErrorMessage name="traderReceiptValidity" />
          </div>
        </div>
        <div className={styles.field}>
          <label className="text-right">Département</label>
          <div className={styles.field__value}>
            <Field
              type="text"
              name="traderReceiptDepartment"
              placeholder="75"
            />
            <RedErrorMessage name="traderReceiptDepartment" />
          </div>
        </div>
      </div>
    </div>
  );
}
