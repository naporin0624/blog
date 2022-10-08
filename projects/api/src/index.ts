import { join } from "path";

import { createServer } from "graphql-yoga";
import { queryType, stringArg, makeSchema } from "nexus";

const port = parseInt(`${process.env.PORT ?? "4000"}`);

const Query = queryType({
  definition(t) {
    t.string("hello", {
      args: { name: stringArg() },
      resolve: (parent, { name }) => `Hello ${name || "World"}!`,
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: join(__dirname, "/generated/schema.graphql"),
    typegen: join(__dirname, "/generated/typings.ts"),
  },
});

const server = createServer({
  port,
  schema,
});

void server.start();
