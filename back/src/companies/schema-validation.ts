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
        transporterReceiptId: string()
          .notRequired()
          .nullable(),
        traderReceiptId: string()
          .notRequired()
          .nullable()
      })
    }),
    createTransporterReceipt: object({
      input: object({
        receiptNumber: string()
          .required()
          .nullable(false),
        validityLimit: string()
          .required()
          .nullable(false),
        department: string()
          .required()
          .nullable(false)
      })
    }),
    createTraderReceipt: object({
      input: object({
        receiptNumber: string()
          .required()
          .nullable(false),
        validityLimit: string()
          .required()
          .nullable(false),
        department: string()
          .required()
          .nullable(false)
      })
    }),
    updateTransporterReceipt: object({
      input: object({
        id: string()
          .required()
          .nullable(false),
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
    }),
    updateTraderReceipt: object({
      input: object({
        id: string()
          .required()
          .nullable(false),
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
