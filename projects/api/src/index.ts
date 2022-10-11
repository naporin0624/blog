/* eslint-disable no-console */
import http from "http";

import cors from "cors";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";

import { apolloServer } from "./graphql";
import { fileSize, host, port } from "./shared/config";

async function bootstrap() {
  const app = express();
  app.use(cors());
  app.use(graphqlUploadExpress({ maxFileSize: fileSize, maxFiles: 10 }));

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });
  app.get("/", (req, res) => {
    res.status(200).send("hello world!");
  });

  const httpServer = http.createServer(app);
  httpServer.listen({ host, port }, () =>
    console.log(`🚀 Server ready at: http://${host}:${port}`)
  );
}

void bootstrap();
