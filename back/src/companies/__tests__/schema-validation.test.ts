import { CompanyType } from "../../generated/types";
import { ValidationError } from "yup";
import validation from "../schema-validation";

describe("createCompany validation", () => {
  const validator = validation.Mutation.createCompany;

  test("transporterReceipt is not required", () => {
    const input = {
      companyInput: {
        siret: "12345678901234",
        companyTypes: [CompanyType.Transporter]
      }
    };
    validator.validateSync(input);
    expect(validator.isValidSync(input)).toBeTruthy();
  });

  test("transporterReceipt can be null", () => {
    const input = {
      companyInput: {
        siret: "12345678901234",
        companyTypes: [CompanyType.Transporter],
        transporterReceipt: null
      }
    };
    expect(validator.isValidSync(input)).toBeTruthy();
  });

  test("transporterReceipt with all info", async () => {
    const input = {
      companyInput: {
        siret: "12345678901234",
        companyTypes: [CompanyType.Transporter],
        transporterReceipt: {
          receiptNumber: "1234",
          validityLimit: "2023-03-31T00:00:00.000Z",
          department: "07"
        }
      }
    };
    expect(validator.isValidSync(input)).toBeTruthy();
  });

  // TODO fix this test
  test.skip("transporterReceipt with missing info", () => {
    const input = {
      companyInput: {
        siret: "12345678901234",
        companyTypes: [CompanyType.Transporter],
        transporterReceipt: {
          // missing validityLimit and department
          receiptNumber: "1234"
        }
      }
    };
    // if present, transporterReceipt should have all fields present
    expect(validator.isValidSync(input)).toBeFalsy();
  });
});
