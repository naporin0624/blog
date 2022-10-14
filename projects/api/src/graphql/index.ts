import { ApolloServer } from "apollo-server-express";
import Axios from "axios";
import { GraphQLError } from "graphql";

import { context } from "~/context";

import { StatusCodePlugin } from "./plugins/status-code.plugin";
import { schema } from "./schema";

export const apolloServer = new ApolloServer({
  schema,
  cache: "bounded",
  context,
  formatError(error) {
    if (error.extensions.exception) {
      error.extensions.exception.stacktrace = undefined;
    }
    if (Axios.isAxiosError(error.originalError)) {
      return new GraphQLError(error.message, {
        path: error.path,
        extensions: {
          exception: {
            code: error.originalError.code,
          },
        },
      });
    }

    return error;
  },
  plugins: [StatusCodePlugin],
});
