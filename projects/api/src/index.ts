/* eslint-disable no-console */
import cors from "cors";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";

import { apolloServer } from "./graphql";
import { fileSize } from "./shared/config";

const port = parseInt(`${process.env.PORT ?? "4000"}`);

async function bootstrap() {
  const app = express();
  app.use(cors());
  app.use(graphqlUploadExpress({ maxFileSize: fileSize, maxFiles: 10 }));

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port }, () => {
    console.log(`server on http://localhost:${port}/graphql`);
  });
}

void bootstrap();
