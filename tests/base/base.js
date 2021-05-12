import { createTestClient } from "apollo-server-testing";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "../../src/graphql/typeDefs";
import resolvers from "../../src/graphql/resolvers";
import { User, Card, Payment } from "../../src/services";
import { user, req } from "./data";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mockEntireSchema: false,
  mocks: true,
  context: () => ({
    User,
    Card,
    Payment,
    req,
    user: user.data,
  }),
});

export default createTestClient(server);
