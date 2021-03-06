import { createTestClient } from "apollo-server-testing";
import { UserInputError, ApolloError } from "apollo-server-express";
import { readFileSync } from "fs";
import { ValidationError } from "yup";

const mockHello = jest.fn();

jest.mock("../schema.ts", () => ({
  typeDefs: `
    type Query {
        hello: String
      }
  `,
  resolvers: {
    Query: {
      hello: () => mockHello()
    }
  },
  shieldRulesTree: {}
}));

const HELLO = `query { hello }`;

describe("Error handling", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
    mockHello.mockReset();
  });

  test("errors should be null if query resolve correctly", async () => {
    process.env.NODE_ENV = "production";
    const server = require("../server").server;
    const { query } = createTestClient(server);
    mockHello.mockResolvedValueOnce("world");
    const { errors, data } = await query({ query: HELLO });
    expect(errors).toBeUndefined();
    expect(data).toEqual({ hello: "world" });
  });

  test("subclasses of Apollo errors should be formatted correctly when thrown", async () => {
    process.env.NODE_ENV = "production";
    const server = require("../server").server;
    const { query } = createTestClient(server);
    mockHello.mockImplementationOnce(() => {
      throw new UserInputError("Oups");
    });
    const { errors } = await query({ query: HELLO });
    expect(errors).toHaveLength(1);
    const error = errors[0];
    expect(error.message).toEqual("Oups");
    expect(error.extensions.code).toEqual("BAD_USER_INPUT");
  });

  test("subclasses of Apollo errors should be formatted correctly when returned", async () => {
    process.env.NODE_ENV = "production";
    const server = require("../server").server;
    const { query } = createTestClient(server);
    mockHello.mockImplementationOnce(() => {
      return new UserInputError("Oups");
    });
    const { errors } = await query({ query: HELLO });
    expect(errors).toHaveLength(1);
    const error = errors[0];
    expect(error.message).toEqual("Oups");
    expect(error.extensions.code).toEqual("BAD_USER_INPUT");
  });

  test("the message of generic Apollo errors without code should be masked", async () => {
    process.env.NODE_ENV = "production";
    const server = require("../server").server;
    const { query } = createTestClient(server);
    mockHello.mockImplementationOnce(() => {
      throw new ApolloError("Bang");
    });
    const { errors } = await query({ query: HELLO });
    expect(errors).toHaveLength(1);

    const error = errors[0];
    expect(error.extensions.code).toEqual("INTERNAL_SERVER_ERROR");
    expect(error.message).toEqual("Erreur serveur");
  });

  test("the message of unhandled errors thrown should be masked", async () => {
    process.env.NODE_ENV = "production";
    const server = require("../server").server;
    const { query } = createTestClient(server);
    mockHello.mockImplementationOnce(() => {
      readFileSync("path/does/not/exist");
    });
    const { errors } = await query({ query: HELLO });
    expect(errors).toHaveLength(1);

    const error = errors[0];
    expect(error.extensions.code).toEqual("INTERNAL_SERVER_ERROR");
    expect(error.message).toEqual("Erreur serveur");
  });

  test("the message of unhandled error returned should be masked", async () => {
    process.env.NODE_ENV = "production";
    const server = require("../server").server;
    const { query } = createTestClient(server);
    mockHello.mockImplementationOnce(() => {
      return readFileSync("path/does/not/exist");
    });
    const { errors } = await query({ query: HELLO });
    expect(errors).toHaveLength(1);

    const error = errors[0];
    expect(error.extensions.code).toEqual("INTERNAL_SERVER_ERROR");
    expect(error.message).toEqual("Erreur serveur");
  });

  test("unhandled errors message should be displayed in dev", async () => {
    process.env.NODE_ENV = "dev";
    const server = require("../server").server;
    const { query } = createTestClient(server);
    mockHello.mockImplementationOnce(() => {
      throw new Error("Bang");
    });
    const { errors } = await query({ query: HELLO });
    const error = errors[0];
    expect(error.extensions.code).toEqual("INTERNAL_SERVER_ERROR");
    expect(error.message).toEqual("Bang");
    process.env = OLD_ENV;
  });

  test("Yup validation errors should be displayed as an input error", async () => {
    const server = require("../server").server;
    const { query } = createTestClient(server);
    mockHello.mockImplementationOnce(() => {
      throw new ValidationError("Bang", "Wrong value", "path");
    });
    const { errors } = await query({ query: HELLO });
    const error = errors[0];
    expect(error.extensions.code).toEqual("BAD_USER_INPUT");
    expect(error.message).toContain("Bang");
  });
});
