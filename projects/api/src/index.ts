/* eslint-disable no-console */
import { ApolloServer } from "apollo-server-express";
import express from "express";

import { context } from "./context";
import { schema } from "./graphql";

const port = parseInt(`${process.env.PORT ?? "4000"}`);

async function bootstrap() {
  const app = express();
  const server = new ApolloServer({
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
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
  app.listen({ port }, () => {
    console.log(`server on http://localhost:${port}/graphql`);
  });
}

void bootstrap();
