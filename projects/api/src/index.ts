/* eslint-disable no-console */
import cors from "cors";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";

import { apolloServer } from "./graphql";
import { fileSize } from "./shared/config";

async function bootstrap() {
  const app = express();
  app.use(cors());
  app.use(graphqlUploadExpress({ maxFileSize: fileSize, maxFiles: 10 }));

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const port = process.env.PORT ?? 4000;
  app.listen({ port }, () => {
    console.log(`server on http://localhost:${port}/graphql`);
  });
}

void bootstrap();
