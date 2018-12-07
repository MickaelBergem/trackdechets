import { shield } from "graphql-shield";
import { GraphQLServer } from "graphql-yoga";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { prisma } from "./generated/prisma-client";
import { merge } from "./utils";

const port = process.env.port || 80;

const typesArray = fileLoader(`${__dirname}/**/*.graphql`, { recursive: true });
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(`${__dirname}/**/resolvers.ts`, {
  recursive: true
});
const resolvers = mergeResolvers(resolversArray);

const rulesArray = fileLoader(`${__dirname}/**/rules.ts`, { recursive: true });
const permissions = shield(rulesArray.reduce((prev, cur) => merge(prev, cur)));

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  //middlewares: [permissions],
  context: request => ({
    ...request,
    prisma
  }),
});

server.express.get("/ping", (_, res) => res.send("Pong!"));
server.start({ port }, () =>
  console.log(`Server is running on port ${port}`)
);
