/* eslint-disable no-console */
import http from "http";

import cors from "cors";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";

import { apolloServer } from "./graphql";
import { fileSize } from "./shared/config";

async function bootstrap() {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(cors());
  app.use(graphqlUploadExpress({ maxFileSize: fileSize, maxFiles: 10 }));

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  httpServer.listen(
    {
      host: process.env.HOST || "0.0.0.0",
      port: process.env.PORT || 4000,
    },
    () => console.log("🚀 Server ready at: http://localhost:4000")
  );
}

void bootstrap();
