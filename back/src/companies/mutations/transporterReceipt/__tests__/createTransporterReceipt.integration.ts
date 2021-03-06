import { userFactory } from "../../../../__tests__/factories";
import makeClient from "../../../../__tests__/testClient";
import { resetDatabase } from "../../../../../integration-tests/helper";
import { prisma } from "../../../../generated/prisma-client";

describe("{ mutation { createTransporterReceipt } }", () => {
  afterEach(() => resetDatabase());

  it("should create a transporter receipt", async () => {
    const receipt = {
      receiptNumber: "receiptNumber",
      validityLimit: "2021-03-31T00:00:00.000Z",
      department: "07"
    };

    const user = userFactory();

    const mutation = `
      mutation {
        createTransporterReceipt(
          input: {
            receiptNumber: "${receipt.receiptNumber}"
            validityLimit: "${receipt.validityLimit}"
            department: "${receipt.department}"
          }
          ) { receiptNumber, validityLimit, department }
        }`;
    const { mutate } = makeClient(user);

    const { data } = await mutate(mutation);

    expect(
      await prisma
        .transporterReceiptsConnection()
        .aggregate()
        .count()
    ).toEqual(1);

    expect(data.createTransporterReceipt).toEqual(receipt);
  });
});
