import { ErrorCode } from "../../../common/errors";
import { signedByTransporter } from "../mark-as";
import * as companiesHelpers from "../../../companies/queries/userCompanies";
import { getContext } from "../__mocks__/data";
import { TransporterSignatureFormInput } from "../../../generated/graphql/types";

const temporaryStorageDetailMock = jest.fn(() => Promise.resolve(null));
const formMock = jest.fn(() => Promise.resolve({}));
const appendix2FormsMock = jest.fn(() => Promise.resolve([]));
function mockFormWith(value) {
  const result: any = Promise.resolve(value);
  result.temporaryStorageDetail = temporaryStorageDetailMock;
  result.appendix2Forms = appendix2FormsMock;
  formMock.mockReturnValue(result);
}

const prisma = {
  form: formMock,
  updateForm: jest.fn((...args) => Promise.resolve({})),
  createForm: jest.fn((...args) => Promise.resolve({})),
  createStatusLog: jest.fn((...args) => Promise.resolve({})),
  updateManyForms: jest.fn((...args) => Promise.resolve({})),
  $exists: {
    company: jest.fn((...args) => Promise.resolve(false))
  }
};

jest.mock("../../../generated/prisma-client", () => ({
  prisma: {
    form: () => prisma.form(),
    updateForm: (...args) => prisma.updateForm(...args),
    createForm: (...args) => prisma.createForm(...args),
    createStatusLog: (...args) => prisma.createStatusLog(...args),
    updateManyForms: (...args) => prisma.updateManyForms(...args),
    $exists: {
      company: (...args) => prisma.$exists.company(...args)
    }
  }
}));

describe("Forms -> signedByTransporter mutation", () => {
  const getUserCompaniesMock = jest.spyOn(companiesHelpers, "getUserCompanies");

  const defaultContext = getContext();

  beforeEach(() => {
    Object.keys(prisma).forEach(
      key => prisma[key].mockClear && prisma[key].mockClear()
    );
    getUserCompaniesMock.mockReset();
  });

  it("should fail when if its not signed by producer", async () => {
    expect.assertions(1);
    try {
      getUserCompaniesMock.mockResolvedValue([{ siret: "a siret" } as any]);
      mockFormWith({
        id: 1,
        status: "SEALED",
        emitterCompanySiret: "a siret"
      });

      await signedByTransporter(
        {
          id: "1",
          signingInfo: {
            signedByTransporter: true
          } as TransporterSignatureFormInput
        },
        defaultContext
      );
    } catch (err) {
      expect(err.extensions.code).toBe(ErrorCode.BAD_USER_INPUT);
    }
  });

  it("should fail when if its not signed by transporter", async () => {
    expect.assertions(1);
    try {
      getUserCompaniesMock.mockResolvedValue([{ siret: "a siret" } as any]);
      mockFormWith({
        id: 1,
        status: "SEALED",
        emitterCompanySiret: "a siret"
      });

      await signedByTransporter(
        {
          id: "1",
          signingInfo: {
            signedByProducer: true
          } as TransporterSignatureFormInput
        },
        defaultContext
      );
    } catch (err) {
      expect(err.extensions.code).toBe(ErrorCode.BAD_USER_INPUT);
    }
  });

  it("should fail when security code is wrong", async () => {
    expect.assertions(1);
    try {
      getUserCompaniesMock.mockResolvedValue([{ siret: "a siret" } as any]);
      mockFormWith({
        id: 1,
        status: "SEALED",
        emitterCompanySiret: "a siret"
      });

      await signedByTransporter(
        {
          id: "1",
          signingInfo: {
            signedByProducer: true,
            signedByTransporter: true,
            securityCode: 1234
          } as TransporterSignatureFormInput
        },
        defaultContext
      );
    } catch (err) {
      expect(err.extensions.code).toBe(ErrorCode.FORBIDDEN);
    }
  });

  it("should work when signingInfo are complete and correct", async () => {
    getUserCompaniesMock.mockResolvedValue([{ siret: "a siret" } as any]);
    appendix2FormsMock.mockResolvedValue([{ id: "appendix id" }]);
    mockFormWith({
      id: 1,
      status: "SEALED",
      emitterCompanySiret: "a siret"
    });
    prisma.$exists.company.mockResolvedValue(true);

    await signedByTransporter(
      {
        id: "1",
        signingInfo: {
          signedByProducer: true,
          signedByTransporter: true
        } as TransporterSignatureFormInput
      },
      defaultContext
    );
    expect(prisma.updateForm).toHaveBeenCalledTimes(1);
    expect(prisma.updateManyForms).toHaveBeenCalled();
  });
});
