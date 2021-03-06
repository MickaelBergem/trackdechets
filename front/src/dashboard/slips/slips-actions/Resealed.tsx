import merge from "deepmerge";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { removeNulls } from "../../../common/helper";
import RedErrorMessage from "../../../common/RedErrorMessage";
import CompanySelector from "../../../form/company/CompanySelector";
import DateInput from "../../../form/custom-inputs/DateInput";
import NumberInput from "../../../form/custom-inputs/NumberInput";
import { RadioButton } from "../../../form/custom-inputs/RadioButton";
import Packagings from "../../../form/packagings/Packagings";
import { SlipActionProps } from "../SlipActions";
import { Operations } from "../../../form/processing-operation/ProcessingOperation";

export default function Resealed({
  form,
  onSubmit,
  onCancel,
}: SlipActionProps) {
  // We need a deep merge as sub-objects may be partially filled
  // But without the null values as they break form elements (uncontrolled)
  const initialValues = merge(
    emptyState,
    removeNulls(form.temporaryStorageDetail)
  );
  const [isRefurbished, setIsRefurbished] = useState(
    !!form.temporaryStorageDetail?.wasteDetails?.quantity
  );

  function onChangeRefurbished(values, setFieldValue: (field, value) => void) {
    setIsRefurbished(!isRefurbished);
    const keys = [
      "onuCode",
      "packagings",
      "otherPackaging",
      "numberOfPackages",
      "quantity",
      "quantityType",
    ];
    const hasBeenFilled = keys.some(
      (key) => initialValues.wasteDetails[key] !== values.wasteDetails[key]
    );

    if (isRefurbished && !hasBeenFilled) {
      setFieldValue(
        "wasteDetails",
        keys.reduce((prev, key) => {
          prev[key] = form.wasteDetails ? form.wasteDetails[key] : null;
          return prev;
        }, {})
      );
    }
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit({ info: values })}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <h5>Installation de destination prévue</h5>

            <CompanySelector name="destination.company" />

            <div className="form__group">
              <label>
                Numéro de CAP (le cas échéant)
                <Field type="text" name="destination.cap" />
              </label>
            </div>

            <div className="form__group">
              <label>
                Opération d'élimination / valoristation prévue (code D/R)
              </label>

              <Field component="select" name="destination.processingOperation">
                <option value="">Choisissez...</option>
                {Operations.map((o) => (
                  <option key={o.code} value={o.code}>
                    {o.code} - {o.description.substr(0, 50)}
                    {o.description.length > 50 ? "..." : ""}
                  </option>
                ))}
              </Field>
            </div>

            <div className="form__group">
              <label>
                <input
                  type="checkbox"
                  checked={isRefurbished}
                  onChange={() => onChangeRefurbished(values, setFieldValue)}
                />
                Les déchets ont subi un reconditionnement, je dois saisir les
                détails
              </label>
            </div>

            {isRefurbished && (
              <>
                <h5>Détails du déchet</h5>

                <h4>Conditionnement</h4>
                <div className="form__group">
                  <Field
                    name="wasteDetails.packagings"
                    component={Packagings}
                  />

                  {values.wasteDetails.packagings.indexOf("AUTRE") > -1 && (
                    <label>
                      <Field
                        name="wasteDetails.otherPackaging"
                        type="text"
                        placeholder="Détail de l'autre conditionnement"
                      />
                    </label>
                  )}

                  <Field
                    component={NumberInput}
                    name="wasteDetails.numberOfPackages"
                    label="Nombre de colis"
                  />
                  <RedErrorMessage name="wasteDetails.numberOfPackages" />
                </div>

                <h4>Quantité en tonnes</h4>
                <div className="form__group">
                  <Field
                    component={NumberInput}
                    name="wasteDetails.quantity"
                    placeholder="En tonnes"
                    min="0"
                    step="0.001"
                  />

                  <RedErrorMessage name="wasteDetails.quantity" />

                  <fieldset>
                    <legend>Cette quantité est</legend>
                    <Field
                      name="wasteDetails.quantityType"
                      id="REAL"
                      label="Réelle"
                      component={RadioButton}
                    />
                    <Field
                      name="wasteDetails.quantityType"
                      id="ESTIMATED"
                      label="Estimée"
                      component={RadioButton}
                    />
                  </fieldset>

                  <RedErrorMessage name="wasteDetails.quantityType" />
                </div>
                <div className="form__group">
                  <label>
                    Mentions au titre des règlements ADR, RID, ADNR, IMDG (le
                    cas échéant)
                    <Field type="text" name="wasteDetails.onuCode" />
                  </label>
                </div>
              </>
            )}

            <h5>
              Collecteur-transporteur après entreposage ou reconditionnement
            </h5>

            <CompanySelector name="transporter.company" />

            <div className="form__group">
              <label>
                <Field
                  type="checkbox"
                  name="transporter.isExemptedOfReceipt"
                  checked={values.transporter.isExemptedOfReceipt}
                />
                Le transporteur déclare être exempté de récépissé conformément
                aux dispositions de l'article R.541-50 du code de
                l'environnement.
              </label>
            </div>
            {!values.transporter.isExemptedOfReceipt && (
              <div className="form__group">
                <label>
                  Numéro de récépissé
                  <Field type="text" name="transporter.receipt" />
                </label>

                <RedErrorMessage name="transporter.receipt" />

                <label>
                  Département
                  <Field
                    type="text"
                    name="transporter.department"
                    placeholder="Ex: 83"
                  />
                </label>

                <RedErrorMessage name="transporter.department" />

                <label>
                  Limite de validité
                  <Field
                    component={DateInput}
                    name="transporter.validityLimit"
                  />
                </label>

                <RedErrorMessage name="transporter.validityLimit" />

                <label>
                  Immatriculation
                  <Field
                    type="text"
                    name="transporter.numberPlate"
                    placeholder="Plaque d'immatriculation du véhicule"
                  />
                </label>

                <RedErrorMessage name="transporter.numberPlate" />
              </div>
            )}

            <div className="form__group button__group">
              <button
                type="button"
                className="button secondary"
                onClick={onCancel}
              >
                Annuler
              </button>
              <button type="submit" className="button">
                Je valide
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const emptyState = {
  destination: {
    company: {
      siret: "",
      name: "",
      address: "",
      contact: "",
      mail: "",
      phone: "",
    },
    cap: "",
    processingOperation: "",
  },
  transporter: {
    isExemptedOfReceipt: false,
    receipt: "",
    department: "",
    validityLimit: null,
    numberPlate: "",
    company: {
      siret: "",
      name: "",
      address: "",
      contact: "",
      mail: "",
      phone: "",
    },
  },
  wasteDetails: {
    onuCode: "",
    packagings: [] as string[],
    otherPackaging: "",
    numberOfPackages: null,
    quantity: null,
    quantityType: "ESTIMATED",
  },
};
