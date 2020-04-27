import { Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import RedErrorMessage from "../common/RedErrorMessage";
import CompanySelector from "./company/CompanySelector";
import DateInput from "../common/DateInput";
import initialState from "./initial-state";
import { Form } from "./model";
import ProcessingOperation from "./processing-operation/ProcessingOperation";
import TemporaryStorage from "./temporaryStorage/TemporaryStorage";
import "./Recipient.scss";

export default function Recipient() {
  const { values, setFieldValue } = useFormikContext<Form>();

  const [hasTrader, setHasTrader] = useState(!!values.trader.company.siret);

  useEffect(() => {
    if (!hasTrader) {
      setFieldValue("trader.company", initialState.trader.company);
    }
  }, [hasTrader, setFieldValue]);

  return (
    <>
      <h4>
        Installation de destination ou d’entreposage ou de reconditionnement
      </h4>

      <div className="form__group">
        <label>
          <Field type="checkbox" name="recipient.isTempStorage" />
          Le BSD va passer par une étape d'entreposage provisoire ou
          reconditionnement
        </label>
      </div>

      <div className="text-quote recipient">
        <p>
          Pour vous assurer que l'entreprise de destination est autorisée à
          recevoir le déchet, vous pouvez consulter{" "}
          <a
            href="https://www.georisques.gouv.fr/dossiers/installations/donnees#/"
            target="_blank"
            rel="noopener noreferrer"
          >
            la liste des installation classées.
          </a>
        </p>
      </div>

      <CompanySelector
        name="trader.company"
        onCompanySelected={(trader) => {
          if (trader.traderReceipt) {
            setFieldValue("trader.receipt", trader.traderReceipt.receiptNumber);
            setFieldValue(
              "trader.validityLimit",
              new Date(trader.traderReceipt.validityLimit)
            );
            setFieldValue("trader.department", trader.traderReceipt.department);
          } else {
            setFieldValue("trader.receipt", "");
            setFieldValue("trader.validityLimit", "");
            setFieldValue("trader.department", "");
          }
        }}
      />

      <h4>Informations complémentaires</h4>

      <div className="form__group">
        <Field
          component={ProcessingOperation}
          name="recipient.processingOperation"
        />

        <RedErrorMessage name="recipient.processingOperation" />
      </div>

      <div className="form__group">
        <label>
          Numéro de CAP (le cas échéant)
          <Field type="text" name="recipient.cap" />
        </label>
      </div>

      <div className="form__group">
        <label>
          <input
            type="checkbox"
            defaultChecked={hasTrader}
            onChange={() => setHasTrader(!hasTrader)}
          />
          Je suis passé par un négociant
        </label>
      </div>
      {hasTrader && (
        <div className="form__group">
          <h4>Négociant</h4>
          <CompanySelector name="trader.company" />

          <div className="form__group">
            <label>
              Numéro de récépissé
              <Field type="text" name="trader.receipt" />
            </label>

            <RedErrorMessage name="trader.receipt" />

            <label>
              Département
              <Field
                type="text"
                name="trader.department"
                placeholder="Ex: 83"
              />
            </label>

            <RedErrorMessage name="trader.department" />

            <label>
              Limite de validité
              <Field component={DateInput} name="trader.validityLimit" />
            </label>

            <RedErrorMessage name="trader.validityLimit" />
          </div>
        </div>
      )}

      <TemporaryStorage name="temporaryStorageDetail" />
    </>
  );
}
