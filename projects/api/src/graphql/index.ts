import { ApolloServer } from "apollo-server-express";

import { context } from "~/context";

import { schema } from "./schema";

export const apolloServer = new ApolloServer({
  schema,
  cache: "bounded",
  context,
  formatError(error) {
    if (error.extensions.exception) {
      error.extensions.exception.stacktrace = undefined;
    }

    return error;
  },
});
