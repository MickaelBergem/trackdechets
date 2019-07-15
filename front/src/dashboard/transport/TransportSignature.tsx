import React, { useState } from "react";
import { Form as FormModel } from "../../form/model";
import { FaFileSignature } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { DateTime } from "luxon";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Packagings from "../../form/packagings/Packagings";
import { Wizard } from "./Wizard";
import "./TransportSignature.scss";

export const SIGNED_BY_TRANSPORTER = gql`
  mutation SignedByTransporter(
    $id: ID!
    $signingInfo: TransporterSignatureFormInput!
  ) {
    signedByTransporter(id: $id, signingInfo: $signingInfo) {
      id
      status
    }
  }
`;

type Props = { form: FormModel };

export default function TransportSignature({ form }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a
        className="icon"
        onClick={() => setIsOpen(true)}
        title="Signer ce bordereau"
      >
        <FaFileSignature />
      </a>
      <div
        className="modal__backdrop"
        id="modal"
        style={{
          display: isOpen ? "flex" : "none"
        }}
      >
        <div className="modal">
          <h2>Signature</h2>
          <Mutation
            mutation={SIGNED_BY_TRANSPORTER}
            onCompleted={() => setIsOpen(false)}
          >
            {(signedByTransporter, { error }) => (
              <Wizard
                initialValues={{
                  sentAt: DateTime.local().toISODate(),
                  sentBy: "",
                  securityCode: "",
                  signedByTransporter: false,
                  signedByProducer: false,
                  packagings: form.wasteDetails.packagings,
                  quantity: form.wasteDetails.quantity,
                  onuCode: form.wasteDetails.onuCode
                }}
                onSubmit={(values: any) =>
                  signedByTransporter({
                    variables: { id: form.id, signingInfo: values }
                  })
                }
                onCancel={() => setIsOpen(false)}
              >
                <Wizard.Page title="Signature transporteur">
                  <div className="notification success">
                    Cet écran est à lire et signer par le{" "}
                    <strong>transporteur</strong>
                  </div>
                  <h3>Lieu de collecte</h3>
                  <address>
                    {form.emitter.company.name} ({form.emitter.company.siret})
                    <br /> {form.emitter.company.address}
                  </address>

                  <h3>Déchets à collecter</h3>
                  <p>Bordereau numéro {form.readableId}</p>
                  <p>
                    Appellation du déchet: {form.wasteDetails.name} (
                    {form.wasteDetails.code})
                  </p>

                  <div>
                    <label>
                      Conditionnement
                      <Field name="packagings" component={Packagings} />
                    </label>
                  </div>

                  <p>
                    <label>
                      Poids en tonnes
                      <Field type="number" name="quantity" />
                    </label>
                  </p>

                  <p>
                    <label>
                      Code ADR
                      <Field type="text" name="onuCode" />
                    </label>
                  </p>

                  <h3>Destination du déchet</h3>
                  <address>
                    {form.recipient.company.name} (
                    {form.recipient.company.siret})
                    <br /> {form.recipient.company.address}
                  </address>

                  <h3>Validation</h3>

                  <p>
                    <label>
                      Date de l'enlèvement
                      <Field type="date" name="sentAt" />
                    </label>
                  </p>

                  <p>
                    <label>
                      <Field type="checkbox" name="signedByTransporter" />
                      J'ai vérifié que les déchets à transporter correspondent
                      aux informations ci avant.
                    </label>
                  </p>

                  <p>
                    <small>
                      Si vous le désirez, vous pouvez accéder à{" "}
                      <a
                        href={`${process.env.REACT_APP_API_ENDPOINT}/pdf?id=${
                          form.id
                        }`}
                        target="_blank"
                      >
                        une vue CERFA du bordereau
                      </a>
                    </small>
                  </p>
                </Wizard.Page>
                <Wizard.Page title="Signature Producteur">
                  <div>
                    <div className="notification success">
                      Cet écran est à lire et signer par le{" "}
                      <strong>producteur du déchet</strong>
                    </div>

                    <h3>Lieu de collecte</h3>
                    <address>
                      {form.emitter.company.name} ({form.emitter.company.siret})
                      <br /> {form.emitter.company.address}
                    </address>

                    <h3>Mes déchets</h3>
                    <p>
                      Bordereau numéro {form.readableId}
                      <br />
                      Appellation du déchet: {form.wasteDetails.name} (
                      {form.wasteDetails.code})
                      <br />
                      Conditionnement: {form.wasteDetails.packagings}
                      <br />
                      Poids total: {form.wasteDetails.quantity} tonnes
                    </p>

                    <h3>Transporteur</h3>
                    <address>
                      {form.transporter.company.name} (
                      {form.transporter.company.siret})
                      <br /> {form.transporter.company.address}
                    </address>

                    <h3>Destination du déchet</h3>
                    <address>
                      {form.recipient.company.name} (
                      {form.recipient.company.siret})
                      <br /> {form.recipient.company.address}
                    </address>

                    <p>
                      <label>
                        <Field type="checkbox" name="signedByProducer" />
                        En tant que producteur du déchet, j'ai vérifié que les
                        déchets confiés au transporter correspondent au
                        informations vue ci-avant et je valide l'enlèvement.
                      </label>
                    </p>

                    <p>
                      <label>
                        Code de sécurité entreprise
                        <Field type="number" name="securityCode" />
                      </label>
                    </p>
                    <p>
                      <label>
                        Nom et prénom
                        <Field type="text" name="sentBy" />
                      </label>
                    </p>
                  </div>
                </Wizard.Page>
              </Wizard>
            )}
          </Mutation>
        </div>
      </div>
    </>
  );
}