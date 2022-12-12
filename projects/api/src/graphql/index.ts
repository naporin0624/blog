import { ApolloError, ApolloServer, ValidationError } from "apollo-server-express";
import Axios from "axios";
import { GraphQLError } from "graphql";

import { isPrismaError } from "~/adapters/db/error";
import { context } from "~/context";

import { StatusCodePlugin } from "./plugins/status-code.plugin";
import { schema } from "./schema";

export const apolloServer = new ApolloServer({
  schema,
  cache: "bounded",
  context,
  formatError(error) {
    if (process.env.NODE_ENV === "development") return error;

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
    if (error instanceof ValidationError) {
      return new ValidationError("invalid query");
    }

    if (isPrismaError(error.originalError)) {
      return new ApolloError("unknown error");
    }

    return error;
  },
  plugins: [StatusCodePlugin],
});
