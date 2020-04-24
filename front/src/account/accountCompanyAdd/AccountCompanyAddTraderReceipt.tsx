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
        <div>
          <label>Numéro de récépissé</label>
          <div>
            <Field type="text" name="traderReceiptNumber" />
            <RedErrorMessage name="traderReceiptNumber" />
          </div>
        </div>
        <div>
          <label>Limite de validité</label>
          <div>
            <Field type="date" name="traderReceiptValidity" />
            <RedErrorMessage name="traderReceiptValidity" />
          </div>
        </div>
        <div>
          <label>Département</label>
          <div>
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
