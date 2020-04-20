import { array, object, string } from "yup";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "application/pdf"
];

export default {
  Mutation: {
    createCompany: object({
      companyInput: object({
        siret: string().required("Le SIRET de l'entreprise est obligatoire"),
        gerepId: string().nullable(true),
        companyTypes: array().of(
          string().matches(
            /(PRODUCER|COLLECTOR|WASTEPROCESSOR|TRANSPORTER|WASTE_VEHICLES|WASTE_CENTER|TRADER)/
          )
        ),
        codeNaf: string().nullable(true),
        companyName: string().nullable(true),
        documentKeys: array().of(string()),
        transporterReceipt: object()
          .notRequired()
          .nullable()
          .shape({
            receiptNumber: string()
              .notRequired()
              .nullable(),
            validityLimit: string()
              .notRequired()
              .nullable(),
            department: string()
              .notRequired()
              .nullable()
          }),
        traderReceipt: object()
          .notRequired()
          .nullable()
          .shape({
            receiptNumber: string()
              .notRequired()
              .nullable(),
            validityLimit: string()
              .notRequired()
              .nullable(),
            department: string()
              .notRequired()
              .nullable()
          })
      })
    }),
    createUploadLink: object({
      fileName: string().required("Le non du fichier est obligatoire"),
      fileType: string().test(
        "fileType",
        "Format de fichier non supporté",
        type => SUPPORTED_FORMATS.includes(type)
      )
    })
  }
};
