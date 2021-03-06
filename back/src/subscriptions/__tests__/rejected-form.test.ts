import axios from "axios";
import * as sirene from "../../companies/sirene";
import { CompanySearchResult } from "../../companies/sirene/types";
import { mailWhenFormIsDeclined } from "../forms";
import { FormSubscriptionPayload } from "../../generated/prisma-client";

// This form will be refused,
const mockedForm = {
  id: "xyz12345",
  wasteDetailsQuantity: 11,
  signedByTransporter: null,
  emitterCompanyName: "DECHET FACTORY SA",
  transporterCompanyName: "TRANSPORTER",
  traderCompanyAddress: "",
  transporterReceipt: "xyz",
  quantityReceived: 12,
  updatedAt: "2019-10-16T07:46:05.277Z",
  processedAt: null,
  wasteDetailsOnuCode: "",
  emitterType: "PRODUCER",
  traderValidityLimit: null,
  traderCompanyContact: "",
  wasteDetailsCode: "03 01 04*",
  processedBy: null,
  recipientCompanyAddress: "01 Rue Marie Curie 66000 Laville",
  transporterDepartment: "83",
  emitterWorkSitename: "",
  emitterWorkSiteAddress: "",
  emitterWorkSiteCity: "",
  emitterWorkSitePostalCode: "",
  emitterWorkSiteInfos: "",
  recipientCap: "",
  emitterCompanyPhone: "06 12 45 56 78",
  emitterCompanyMail: "producer@example.com",
  wasteDetailsOtherPackaging: "",
  receivedBy: "john",
  transporterCompanySiret: "12346084400013",
  processingOperationDescription: null,
  transporterCompanyAddress: "01 Rue Marie Curie 66000 Laville",
  nextDestinationProcessingOperation: null,
  nextDestinationCompanyAddress: null,
  nextDestinationCompanyPhone: null,
  nextDestinationCompanyMail: null,
  nextDestinationCompanyContact: null,
  nextDestinationCompanySiret: null,
  recipientCompanyPhone: "06 18 55 66 77",
  traderCompanyName: "",
  isDeleted: false,
  transporterCompanyContact: "Jim",
  traderCompanyMail: "",
  emitterCompanyAddress: "rue de la Paix, 77000 Une ville",
  sentBy: "John",
  status: "SENT",
  createdAt: "2019-10-16T07:45:13.959Z",
  recipientCompanySiret: "12346084400013",
  transporterCompanyMail: "recipient@example.com",
  wasteDetailsName: "plop",
  traderDepartment: "",
  recipientCompanyContact: "jean",
  receivedAt: "2019-10-16T00:00:00.000Z",
  transporterIsExemptedOfReceipt: false,
  sentAt: "2019-10-16T00:00:00.000Z",
  traderCompanySiret: "",
  transporterNumberPlate: "1",
  recipientProcessingOperation: "D 3",
  wasteDetailsPackagings: ["BENNE"],
  transporterValidityLimit: "2099-10-18T00:00:00.000Z",
  emitterCompanyContact: "aa",
  traderReceipt: "",
  wasteDetailsQuantityType: "ESTIMATED",
  transporterCompanyPhone: "06 18 76 02 96",
  recipientCompanyMail: "recipient@example.com",
  wasteDetailsConsistence: "SOLID",
  wasteDetailsNumberOfPackages: 1,
  traderCompanyPhone: "",
  noTraceability: null,
  emitterCompanySiret: "12343606600011",
  processingOperationDone: null,
  readableId: "TD-19-AAA03488",
  recipientCompanyName: "Dechet processor SA",
  wasteAcceptationStatus: "REFUSED"
};

const mockedCompanyAdmins = {
  "12343606600011": [
    {
      name: "Eric",
      email: "producer@example.com",
      id: "qsd678",
      isActive: true,
      phone: "06 18 33 22 33"
    }
  ],
  "12346084400013": [
    {
      name: "Henry",
      email: "recipient@example.com",
      id: "qsd678",
      isActive: true,
      phone: "06 18 33 22 33"
    }
  ]
};

const formPayload = (wasteAcceptationStatus): FormSubscriptionPayload => ({
  node: {
    id: "xyz12345",
    readableId: "TD-xxx",
    status: "REFUSED",
    createdAt: "2019-10-16T07:45:13.959Z",
    updatedAt: "2019-10-16T07:45:13.959Z",
    wasteAcceptationStatus,
    wasteRefusalReason: "Non conforme",
    quantityReceived: 21.3
  },
  updatedFields: [
    "wasteAcceptationStatus",
    "wasteRefusalReason",
    "quantityReceived"
  ],
  mutation: "UPDATED",
  previousValues: {
    id: "xyz12345",
    readableId: "TD-xxx",
    status: "SENT",
    createdAt: "2019-10-16T07:45:13.959Z",
    updatedAt: "2019-10-16T07:45:13.959Z"
  }
});

// entreprise.data.gouv responses, giving 66 and 77 departements for companies involved in the form
const insee1: CompanySearchResult = {
  siret: "12346084400013",
  name: "Dechet Factory SA",
  naf: "123",
  libelleNaf: "Fabricant de déchets",
  address: "01 Rue Marie Curie 66480 Laville",
  longitude: 1.0,
  latitude: 1.0,
  codeCommune: "66001"
};
const insee2: CompanySearchResult = {
  siret: "12346085500055",
  name: "Dechet processor SA",
  naf: "345",
  libelleNaf: "Traitement de déchets",
  address: "rue de la Paix, 77760 Une ville",
  longitude: 2.0,
  latitude: 2.0,
  codeCommune: "77001"
};

// Mock pdf service
jest.mock("../../forms/pdf", () => ({
  pdfEmailAttachment: jest.fn(() => "base64xyz")
}));
// Mock a utils function that hits th db
jest.mock("../../companies/queries", () => ({
  getCompanyAdminUsers: jest.fn(siret => mockedCompanyAdmins[siret])
}));

// Mock prima DB
jest.mock("../../generated/prisma-client", () => ({
  prisma: {
    form: jest.fn(() => mockedForm)
  }
}));

// spies on searchCompany to capture calls to entreprise.data.gouv.fr
const searchCompanySpy = jest.spyOn(sirene, "searchCompany");
// spies on axios get to capture calls to geo.api.gouv.fr
const mockedAxiosGet = jest.spyOn(axios, "get");
// spies on axios post to capture calls to td-mail
const mockedAxiosPost = jest.spyOn(axios, "post");

const { MJ_MAIN_TEMPLATE_ID } = process.env;
/**
 * Test mailWhenFormIsDeclined function
 * We check:
 *    searchCompany is called twice
 *    geo.api.gouv.fr is called twice
 *    td-mail is called 3 times with right params
 *    dreals from relevant departments are emailed
 */
describe("mailWhenFormIsDeclined", () => {
  // tweak and restore process.env after each test
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); //   clears the cache
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
    searchCompanySpy.mockReset(); // removes calls, instances, returned values and implementations
    mockedAxiosPost.mockReset(); // removes calls, instances, returned values and implementations
    mockedAxiosGet.mockReset(); // removes calls, instances, returned values and implementations
  });

  it("should send mails if waste is refused", async () => {
    process.env.NOTIFY_DREAL_WHEN_FORM_DECLINED = "true";

    searchCompanySpy
      .mockResolvedValueOnce(insee1)
      .mockResolvedValueOnce(insee2);

    (mockedAxiosGet as jest.Mock<any>)
      .mockResolvedValueOnce({ data: { codeDepartement: "66" } })
      .mockResolvedValueOnce({ data: { codeDepartement: "77" } });
    (mockedAxiosPost as jest.Mock<any>).mockImplementation(() =>
      Promise.resolve({
        data: { result: "ok" }
      })
    );

    await mailWhenFormIsDeclined(formPayload("REFUSED"));

    // get called twice for entreprise.data.gouv.fr
    expect(searchCompanySpy).toHaveBeenCalledTimes(2);

    // get called twice for geo.api.gouv.fr
    expect(mockedAxiosGet as jest.Mock<any>).toHaveBeenCalledTimes(2);

    // post called 1 time for mail sending
    expect(mockedAxiosPost as jest.Mock<any>).toHaveBeenCalledTimes(1);

    const args = mockedAxiosPost.mock.calls;
    // right service was called

    expect(args[0][0]).toEqual("http://td-mail/send");

    const payload1 = args[0][1];

    // pdf from was attached
    expect(payload1.attachment).toEqual("base64xyz");

    // we have 3 recipients, emitter and 2 dreals matching 66 and 77 depts
    expect(payload1.to[0].email).toEqual("producer@example.com");
    expect(payload1.cc[0].email).toEqual("recipient@example.com");
    expect(payload1.cc[1].email).toEqual(
      "uid-11-66.dreal-occitanie@developpement-durable.gouv.fr"
    );
    expect(payload1.cc[2].email).toEqual(
      "ud77.driee-if@developpement-durable.gouv.fr"
    );

    // check form readable id is in mail body
    expect(payload1.body).toContain("TD-19-AAA03488");

    const templateId = parseInt(MJ_MAIN_TEMPLATE_ID, 10);
    expect(payload1.templateId).toEqual(templateId);
  });

  it("should send mails if waste is partially refused", async () => {
    process.env.NOTIFY_DREAL_WHEN_FORM_DECLINED = "true";

    searchCompanySpy
      .mockResolvedValueOnce(insee1)
      .mockResolvedValueOnce(insee2);

    // spies on axios get and post methods
    (mockedAxiosGet as jest.Mock<any>)
      .mockResolvedValueOnce({ data: { codeDepartement: "66" } })
      .mockResolvedValueOnce({ data: { codeDepartement: "77" } });
    (mockedAxiosPost as jest.Mock<any>).mockImplementation(() =>
      Promise.resolve({
        data: { result: "ok" }
      })
    );

    await mailWhenFormIsDeclined(formPayload("PARTIALLY_REFUSED"));

    // get called 2 times for entreprise.data.gouv.fr
    expect(searchCompanySpy).toHaveBeenCalledTimes(2);

    // get called 2 times for geo.api.gouv.fr
    // expect(mockedAxiosGet as jest.Mock<any>).toHaveBeenCalledTimes(2);

    // post called 1 time for mail sending
    expect(mockedAxiosPost as jest.Mock<any>).toHaveBeenCalledTimes(1);

    const args = mockedAxiosPost.mock.calls;

    // right service was called
    expect(args[0][0]).toEqual("http://td-mail/send");

    const payload1 = args[0][1];

    // pdf from was attached
    expect(payload1.attachment).toEqual("base64xyz");

    // we have 3 recipients, emitter and 2 dreals matching 66 and 77 depts
    expect(payload1.to[0].email).toEqual("producer@example.com");
    expect(payload1.cc[0].email).toEqual("recipient@example.com");
    expect(payload1.cc[1].email).toEqual(
      "uid-11-66.dreal-occitanie@developpement-durable.gouv.fr"
    );
    expect(payload1.cc[2].email).toEqual(
      "ud77.driee-if@developpement-durable.gouv.fr"
    );

    // check form readable id is in mail body
    expect(payload1.body).toContain("TD-19-AAA03488");

    const templateId = parseInt(MJ_MAIN_TEMPLATE_ID, 10);
    expect(payload1.templateId).toEqual(templateId);
  });
});
