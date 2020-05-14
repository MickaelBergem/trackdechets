import { CaptureConsole } from "@sentry/integrations";
import {
  ApolloServer,
  makeExecutableSchema,
  ApolloError,
  UserInputError
} from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { sentry } from "graphql-middleware-sentry";
import { shield } from "graphql-shield";
import { prisma } from "./generated/prisma-client";
import { typeDefs, resolvers, shieldRulesTree } from "./schema";
import { GraphQLContext } from "./types";
import { ErrorCode } from "./common/errors";

const { SENTRY_DSN, NODE_ENV } = process.env;

const shieldMiddleware = shield(shieldRulesTree, { allowExternalErrors: true });

/**
 * Custom report error for sentry middleware
 * It decides whether or not the error should be captured
 */
export function reportError(res: Error | any) {
  const whiteList = [
    ErrorCode.GRAPHQL_PARSE_FAILED,
    ErrorCode.GRAPHQL_VALIDATION_FAILED,
    ErrorCode.BAD_USER_INPUT,
    ErrorCode.UNAUTHENTICATED,
    ErrorCode.FORBIDDEN
  ];

  if (res.extensions && whiteList.includes(res.extensions.code)) {
    return false;
  }
  return true;
}

/**
 * Sentry configuration
 * Capture console.error statements
 */
const sentryMiddleware = () =>
  sentry<GraphQLContext>({
    config: {
      dsn: SENTRY_DSN,
      environment: NODE_ENV,
      integrations: [new CaptureConsole({ levels: ["error"] })]
    },
    forwardErrors: true,
    withScope: (scope, error, context) => {
      const reqUser = !!context.user ? context.user.email : "anonymous";
      scope.setUser({
        email: reqUser
      });

      scope.setExtra("body", context.req.body);
      scope.setExtra("origin", context.req.headers.origin);
      scope.setExtra("user-agent", context.req.headers["user-agent"]);
      scope.setExtra("ip", context.req.headers["x-real-ip"]);
      scope.setTag("service", "api");
    },
    reportError
  });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export const schemaWithMiddleware = applyMiddleware(
  schema,
  ...[shieldMiddleware, ...(SENTRY_DSN ? [sentryMiddleware()] : [])]
);

export const server = new ApolloServer({
  schema: schemaWithMiddleware,
  introspection: true, // used to enable the playground in production
  playground: true, // used to enable the playground in production
  context: async ctx => {
    return {
      ...ctx,
      // req.user is made available by passport
      ...{ user: !!ctx.req ? ctx.req.user : null },
      prisma
    };
  },
  formatError: err => {
    // Catch Yup `ValidationError` and throw a `UserInputError` instead of an `InternalServerError`
    if (err.extensions.exception?.name === "ValidationError") {
      return new UserInputError(err.extensions.exception.errors.join("\n"));
    }
    if (
      err.extensions.code === ErrorCode.INTERNAL_SERVER_ERROR &&
      NODE_ENV !== "dev"
    ) {
      // Do not leak error for internal server error in production
      return new ApolloError("Erreur serveur", ErrorCode.INTERNAL_SERVER_ERROR);
    }
    return err;
  }
});
