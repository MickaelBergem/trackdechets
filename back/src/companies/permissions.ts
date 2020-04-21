import { isCompanyAdmin, isAuthenticated } from "../common/rules";
import {
  canUpdateDeleteTransporterReceipt,
  canUpdateDeleteTraderReceipt
} from "./rules";

export default {
  Query: {
    favorites: isAuthenticated
  },
  Mutation: {
    updateCompany: isCompanyAdmin,
    renewSecurityCode: isCompanyAdmin,
    createCompany: isAuthenticated,
    createUploadLink: isAuthenticated,
    createTransporterReceipt: isAuthenticated,
    updateTransporterReceipt: canUpdateDeleteTransporterReceipt,
    createTraderReceipt: isAuthenticated,
    updateTraderReceipt: canUpdateDeleteTraderReceipt
  }
};
