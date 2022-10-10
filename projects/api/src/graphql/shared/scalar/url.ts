import { Kind } from "graphql";
import { scalarType } from "nexus";

import { InvalidError } from "~/shared/error";

export const URLScalar = scalarType({
  name: "URL",
  asNexusMethod: "url",
  sourceType: "string",
  description: "url",
  parseValue(value) {
    if (typeof value !== "string") throw new InvalidError();

    return new URL(value).href;
  },
  serialize(value) {
    if (typeof value !== "string") throw new InvalidError();

    return new URL(value).href;
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING: {
        return new URL(ast.value).href;
      }
      default: {
        return null;
      }
    }
  },
});
