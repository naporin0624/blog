import { join } from "path";

import {
  makeSchema,
  connectionPlugin,
  fieldAuthorizePlugin,
  queryComplexityPlugin,
} from "nexus";

import * as Mutation from "./mutation";
import * as Query from "./query";
import * as Input from "./shared/input";
import * as Model from "./shared/model";
import * as Scalar from "./shared/scalar";

export const schema = makeSchema({
  types: [Scalar, Model, Input, Query, Mutation],
  outputs: {
    schema: join(__dirname, "../generated/schema.graphql"),
    typegen: join(__dirname, "../generated/typings.ts"),
  },
  plugins: [
    connectionPlugin({
      extendConnection: {
        totalCount: { type: "Int", requireResolver: false },
      },
    }),
    fieldAuthorizePlugin(),
    queryComplexityPlugin(),
  ],
  contextType: {
    module: join(__dirname, "../context.ts"),
    export: "Context",
  },
  features: {
    abstractTypeStrategies: {
      resolveType: true,
      __typename: false,
    },
  },
});
