import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import { NotificationError } from "../common/Error";
import {
  Mutation,
  MutationResetPasswordArgs,
} from "../generated/graphql/types";

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetPassword, { error }] = useMutation<
    Pick<Mutation, "resetPassword">,
    MutationResetPasswordArgs
  >(RESET_PASSWORD);
  return (
    <section className="section section-white">
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            resetPassword({ variables: { email } }).then((_) =>
              setShowSuccess(true)
            );
            setShowSuccess(false);
            setEmail("");
          }}
        >
          <h1>Réinitialisation de votre mot de passe</h1>
          <p>
            Afin de réinitialiser votre mot de passe, merci de saisir votre
            email. Un nouveau mot de passe vous sera transmis.
          </p>
          <div className="form__group">
            <label>
              <input
                type="text"
                placeholder="Saisissez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <button className="button" type="submit">
            Réinitialiser
          </button>
        </form>
        {showSuccess && (
          <div className="notification success">
            Un email avec votre nouveau mot de passe vient de vous être envoyé.
          </div>
        )}
        {error && <NotificationError apolloError={error} />}
      </div>
    </section>
  );
}
