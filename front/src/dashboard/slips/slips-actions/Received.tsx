import React from "react";
import { Formik, Field, Form } from "formik";
import { DateTime } from "luxon";
import NumberInput from "../../../form/custom-inputs/NumberInput";
import DateInput from "../../../form/custom-inputs/DateInput";
import { SlipActionProps } from "../SlipActions";
import {
  InlineRadioButton,
  RadioButton,
} from "../../../form/custom-inputs/RadioButton";
import {
  WasteAcceptationStatusInput as WasteAcceptationStatus,
  FormStatus,
} from "../../../generated/graphql/types";

const textConfig = {
  [WasteAcceptationStatus.Accepted]: {
    validationText:
      "En validant, je confirme la réception des déchets indiqués dans ce bordereau.",
  },
  [WasteAcceptationStatus.Refused]: {
    validationText:
      "En refusant ce déchet, je le retourne à son producteur. Un mail automatique Trackdéchets, informera le producteur de ce refus, accompagné du BSD en pdf. L'inspection des ICPE et ma société en recevront une copie",
    refusalReasonText: "Motif du refus",
  },
  [WasteAcceptationStatus.PartiallyRefused]: {
    validationText:
      "En validant, je confirme la réception des déchets pour la quantité indiquée dans ce bordereau. Un mail automatique Trackdéchets, informera le producteur de ce refus partiel, accompagné du BSD en pdf. L'inspection des ICPE et ma société en recevront une copie",
    refusalReasonText: "Motif du refus partiel",
  },
};
const FieldError = ({ fieldError }) =>
  !!fieldError ? <p className="text-red mt-0 mb-0">{fieldError}</p> : null;

export default function Received(props: SlipActionProps) {
  return (
    <div>
      <Formik
        initialValues={{
          receivedBy: "",
          receivedAt: DateTime.local().toISODate(),
          quantityReceived: "",
          wasteAcceptationStatus: "",
          wasteRefusalReason: "",
          ...(props.form.recipient?.isTempStorage &&
            props.form.status === FormStatus.Sent && { quantityType: "REAL" }),
        }}
        onSubmit={(values) => props.onSubmit({ info: values })}
      >
        {({ values, errors, touched, handleReset, setFieldValue }) => {
          const hasErrors = !!Object.keys(errors).length;
          const isTouched = !!Object.keys(touched).length;

          return (
            <Form>
              <div className="form__group">
                <fieldset>
                  <div style={{ display: "flex" }}>
                    <h4 className="mr-2">Lot accepté: </h4>
                    <Field
                      name="wasteAcceptationStatus"
                      id={WasteAcceptationStatus.Accepted}
                      label="Oui"
                      component={InlineRadioButton}
                      onChange={() => {
                        // clear wasteRefusalReason if waste is accepted
                        setFieldValue("wasteRefusalReason", "");
                        setFieldValue(
                          "wasteAcceptationStatus",
                          WasteAcceptationStatus.Accepted
                        );
                      }}
                    />
                    <Field
                      name="wasteAcceptationStatus"
                      id={WasteAcceptationStatus.Refused}
                      label="Non"
                      component={InlineRadioButton}
                      onChange={() => {
                        setFieldValue("quantityReceived", 0);
                        setFieldValue(
                          "wasteAcceptationStatus",
                          WasteAcceptationStatus.Refused
                        );
                      }}
                    />
                    <Field
                      name="wasteAcceptationStatus"
                      id={WasteAcceptationStatus.PartiallyRefused}
                      label="Partiellement"
                      component={InlineRadioButton}
                    />
                  </div>
                </fieldset>
              </div>

              <label>
                Nom du responsable
                <Field type="text" name="receivedBy" placeholder="NOM Prénom" />
                <FieldError fieldError={errors.receivedBy} />
              </label>
              <label>
                Date de réception
                <Field component={DateInput} name="receivedAt" />
                <FieldError fieldError={errors.receivedAt} />
              </label>
              <label>
                Poids à l'arrivée
                <Field
                  component={NumberInput}
                  name="quantityReceived"
                  placeholder="En tonnes"
                  disabled={
                    values.wasteAcceptationStatus ===
                    WasteAcceptationStatus.Refused
                  }
                />
                <FieldError fieldError={errors.quantityReceived} />
                <span>
                  Poids indicatif émis: {props.form.stateSummary?.quantity}{" "}
                  tonnes
                </span>
              </label>
              {props.form.recipient?.isTempStorage &&
                props.form.status === FormStatus.Sent && (
                  <fieldset>
                    <legend>Cette quantité est</legend>
                    <Field
                      name="quantityType"
                      id="REAL"
                      label="Réelle"
                      component={RadioButton}
                    />
                    <Field
                      name="quantityType"
                      id="ESTIMATED"
                      label="Estimée"
                      component={RadioButton}
                    />
                  </fieldset>
                )}
              {/* Display wasteRefusalReason field if waste is refused or partially refused*/}
              {[
                WasteAcceptationStatus.Refused.toString(),
                WasteAcceptationStatus.PartiallyRefused.toString(),
              ].includes(values.wasteAcceptationStatus) && (
                <label>
                  {textConfig[values.wasteAcceptationStatus].refusalReasonText}
                  <Field name="wasteRefusalReason" />
                  <FieldError fieldError={errors.wasteRefusalReason} />
                </label>
              )}
              <p>
                {values.wasteAcceptationStatus &&
                  textConfig[values.wasteAcceptationStatus].validationText}
              </p>
              <div className="form__group button__group">
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => {
                    handleReset();
                    props.onCancel();
                  }}
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className={
                    hasErrors || !isTouched
                      ? "button button--disabled"
                      : "button"
                  }
                  disabled={hasErrors || !isTouched}
                >
                  Je valide
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
