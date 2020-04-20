import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Field, Form, Formik, FormikProps, FormikValues } from "formik";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { GET_ME } from "../dashboard/Dashboard";
import { NotificationError } from "../common/Error";
import Loader from "../common/Loader";
import RedErrorMessage from "../common/RedErrorMessage";
import CompanyType from "../login/CompanyType";
import AccountCompanyAddTransporterReceipt from "./accountCompanyAdd/AccountCompanyAddTransporterReceipt";
import AccountCompanyAddSiret from "./accountCompanyAdd/AccountCompanyAddSiret";
import styles from "./AccountCompanyAdd.module.scss";

const CREATE_COMPANY = gql`
  mutation CreateCompany($companyInput: PrivateCompanyInput!) {
    createCompany(companyInput: $companyInput) {
      id
      name
      givenName
      siret
      companyTypes
    }
  }
`;

const CREATE_UPLOAD_LINK = gql`
  mutation CreateUploadLink($fileName: String!, $fileType: String!) {
    createUploadLink(fileName: $fileName, fileType: $fileType) {
      signedUrl
      key
    }
  }
`;

interface Values extends FormikValues {
  siret: string;
  companyName: string;
  address: string;
  companyTypes: string[];
  gerepId: string;
  codeNaf: string;
  isAllowed: boolean;
  transporterReceiptNumber: string;
  transporterReceiptValidity: string;
  transporterReceiptDepartment: string;
}

interface UploadedFile {
  key?: string;
  file?: File;
  fileName?: string;
  fileType?: string;
}

interface TransporterReceipt {
  receiptNumber?: string;
  validityLimit?: string;
  department?: string;
}

export default function AccountCompanyAdd() {
  const history = useHistory();

  // STATES
  const [toggleForm, setToggleForm] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  // QUERIES AND MUTATIONS
  const [
    createCompany,
    { loading: savingCompany, error: savingError },
  ] = useMutation(CREATE_COMPANY, {
    update(cache, { data: { createCompany } }) {
      const getMeQuery = cache.readQuery<{ me: any }>({ query: GET_ME });
      if (getMeQuery == null) {
        return;
      }
      const { me } = getMeQuery;
      me.companies = (me.companies || []).push(createCompany);

      cache.writeQuery({
        query: GET_ME,
        data: { me },
      });
    },
  });

  const [createUploadLink] = useMutation<{
    createUploadLink: { signedUrl: string; key: string };
  }>(CREATE_UPLOAD_LINK);

  /**
   * Callback passed to AccountCompanyAddSiret to update the form
   * based on the result of { query { companyInfos } }
   * @param companyInfos
   * @param param1
   */
  function onCompanyInfos(
    companyInfos,
    {
      values,
      setFieldValue,
    }: Pick<FormikProps<any>, "values" | "setFieldValue">
  ) {
    // auto-complete field name
    setFieldValue("companyName", companyInfos?.name || "");

    // auto-complete field address
    setFieldValue("address", companyInfos?.address || "");

    // auto-complete field gerepId
    setFieldValue("gerepId", companyInfos?.installation?.codeS3ic || "");

    // auto-complete field codeNaf
    setFieldValue("codeNaf", companyInfos?.naf || "");

    // auto-complete companyTypes
    if (companyInfos && companyInfos.installation) {
      let categories = companyInfos.installation.rubriques
        .filter((r) => !!r.category) // null blocks form submitting
        .map((r) => r.category);
      const companyTypes = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      const currentValue = values.companyTypes;
      setFieldValue("companyTypes", [...currentValue, ...companyTypes]);
    }

    setToggleForm(!!companyInfos);
  }

  /**
   * Form submission callback
   * @param values form values
   */
  async function onSubmit(values: Values) {
    let documentKeys = [] as string[];

    if (uploadedFile && uploadedFile.fileType && uploadedFile.file) {
      console.log("UPLOAD FILE");
      // upload files if any
      try {
        // Retrieves a signed URL
        const { data } = await createUploadLink();
        if (data) {
          // upload file to signed URL
          const uploadLink = data.createUploadLink;
          fetch(uploadLink.signedUrl, {
            method: "PUT",
            body: uploadedFile.file,
            headers: {
              "Content-Type": uploadedFile.fileType,
              "x-amz-acl": "private",
            },
          }).then((_) => (documentKeys = [uploadLink.key]));
        }
      } catch (err) {
        // fail silently if an error occured during file upload
      }
    }

    const {
      address,
      isAllowed,
      transporterReceiptNumber,
      transporterReceiptValidity,
      transporterReceiptDepartment,
      ...companyInput
    } = values;

    let transporterReceipt: TransporterReceipt = {};

    const isTransporter = values.companyTypes.includes("TRANSPORTER");

    if (
      !!transporterReceiptNumber &&
      !!transporterReceiptValidity &&
      !!transporterReceiptDepartment &&
      isTransporter
    ) {
      // all fields should be set
      transporterReceipt = {
        receiptNumber: transporterReceiptNumber,
        validityLimit: transporterReceiptValidity,
        department: transporterReceiptDepartment,
      };
    }

    createCompany({
      variables: {
        companyInput: {
          ...companyInput,
          documentKeys,
          transporterReceipt,
        },
      },
    }).then((_) => {
      history.push("/dashboard/slips");
    });
  }

  if (savingCompany) {
    return <Loader />;
  }

  return (
    <div className="panel">
      {savingError && <NotificationError apolloError={savingError} />}

      <Formik<Values>
        initialValues={{
          siret: "",
          companyName: "",
          address: "",
          companyTypes: [],
          gerepId: "",
          codeNaf: "",
          isAllowed: false,
          transporterReceiptNumber: "",
          transporterReceiptValidity: "",
          transporterReceiptDepartment: "",
        }}
        validate={(values) => {
          // whether or not one of the transporter receipt field is set
          const anyTransporterReceipField =
            !!values.transporterReceiptNumber ||
            !!values.transporterReceiptValidity ||
            !!values.transporterReceiptDepartment;

          const isTransporter = values.companyTypes.includes("TRANSPORTER");

          return {
            ...(values.companyTypes.length === 0 && {
              companyTypes: "Vous devez préciser le type d'établissement",
            }),
            ...(!values.isAllowed && {
              isAllowed:
                "Vous devez certifier être autorisé à créer ce compte pour votre entreprise",
            }),
            ...(values.siret.replace(/\s/g, "").length !== 14 && {
              siret: "Le SIRET doit faire 14 caractères",
            }),
            ...(anyTransporterReceipField &&
              isTransporter &&
              !values.transporterReceiptNumber && {
                transporterReceiptNumber: "Champ obligatoire",
              }),
            ...(anyTransporterReceipField &&
              isTransporter &&
              !values.transporterReceiptValidity && {
                transporterReceiptValidity: "Champ obligatoire",
              }),
            ...(anyTransporterReceipField &&
              isTransporter &&
              !values.transporterReceiptDepartment && {
                transporterReceiptDepartment: "Champ obligatoire",
              }),
          };
        }}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className={styles.companyAddForm}>
            <h5 className={styles.subtitle}>Identification</h5>
            <AccountCompanyAddSiret
              {...{
                values,
                onCompanyInfos: (companyInfo) =>
                  onCompanyInfos(companyInfo, { values, setFieldValue }),
              }}
            />
            {toggleForm && (
              <>
                <div className={styles.field}>
                  <label className={`text-right ${styles.bold}`}>
                    Nom de l'entreprise
                  </label>
                  <div className={styles.field__value}>
                    <Field type="text" name="companyName" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={`text-right ${styles.bold}`}>
                    Code NAF (optionnel)
                  </label>
                  <div className={styles.field__value}>
                    <Field type="text" name="codeNaf" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={`text-right ${styles.bold}`}>
                    Adresse (optionnel)
                  </label>
                  <div className={styles.field__value}>
                    <Field type="text" name="address" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={`text-right ${styles.bold}`}>
                    Justificatif (optionnel)
                  </label>

                  <div className={styles.field__value}>
                    <input
                      type="file"
                      className="button"
                      accept="image/png, image/jpeg, .pdf"
                      onChange={async (event) => {
                        const file = event.currentTarget.files?.item(0);
                        if (!file) {
                          return;
                        }
                        const fileParts = file.name.split(".");
                        const fileName = fileParts[0];
                        const fileType = fileParts[1];
                        setUploadedFile({ file, fileName, fileType });
                      }}
                    />
                    <div className={styles.smaller}>
                      KBIS, justificatif du siège social de l'entreprise... Ce
                      document est suceptible d'être vérifié par l'équipe
                      Trackdéchets afin de lutter contre la fraude. Formats
                      acceptés: jpeg, png, pdf.
                    </div>
                  </div>
                </div>

                <h5 className={styles.subtitle}>Activité</h5>

                <div className={styles.field}>
                  <label className={`text-right ${styles.bold}`}>
                    L'établissement est
                  </label>
                  <div className={styles.field__value}>
                    <Field name="companyTypes" component={CompanyType} />

                    <RedErrorMessage name="companyTypes" />
                  </div>
                </div>

                {values.companyTypes.includes("TRANSPORTER") && (
                  <AccountCompanyAddTransporterReceipt />
                )}

                <div className={styles.field}>
                  <label className={`text-right ${styles.bold}`}>
                    Identifiant GEREP (optionnel)
                  </label>
                  <div className={styles.field__value}>
                    <Field type="text" name="gerepId" />
                    <div className={styles.smaller}>
                      Gestion Electronique du Registre des Emissions Polluantes.{" "}
                      <a
                        href="https://faq.trackdechets.fr/la-gestion-des-dechets-dangereux#quest-ce-quun-identifiant-gerep"
                        target="_blank"
                      >
                        Plus d'informations sur la FAQ
                      </a>
                    </div>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={`text-right ${styles.bold}`}>
                    Validation
                  </label>
                  <div className={styles.field__value}>
                    <label>
                      <Field type="checkbox" name="isAllowed" />
                      Je certifie disposer du pouvoir pour créer un compte au
                      nom de mon entreprise
                    </label>

                    <RedErrorMessage name="isAllowed" />
                  </div>
                </div>

                <div className={styles["submit-form"]}>
                  <button
                    className="button-outline primary"
                    disabled={isSubmitting}
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    className="button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Créer l'entreprise
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
