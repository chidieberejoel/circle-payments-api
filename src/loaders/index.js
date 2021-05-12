import cors from "cors";
import helmet from "helmet";
import { ApolloServer } from "apollo-server-express";

import { auth } from "../helpers";
import { User, Card, Payment } from "../services";
import config from "../config";
import typeDefs from "../graphql/typeDefs";
import resolvers from "../graphql/resolvers";
import directives from "../graphql/directives";

export default {
  init: (app) => {
    app.use(cors());
    app.use(
      helmet({
        contentSecurityPolicy:
          config.nodeEnv === "production" ? undefined : false,
      }),
    );
  },
  graphql: new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
      ...directives.schemaDirectives,
    },
    context: async ({ req }) => {
      const user = await auth(req);
      return {
        User, Card, Payment, user, req,
      };
    },
    dataSources: () => ({}),
    playground: {
      tabs: [
        {
          endpoint: "/graphql",
        },
      ],
    },
  }),
};
