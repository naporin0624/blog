import { Kind } from "graphql";
import { DateTime } from "luxon";
import { scalarType } from "nexus";

import { InvalidError } from "~/shared/error";

export const DateScalar = scalarType({
  name: "Date",
  asNexusMethod: "date",
  description: "Date custom scalar type",
  sourceType: "Date",
  parseValue(value): Date {
    if (typeof value !== "string") throw new InvalidError();

    return DateTime.fromISO(value).toJSDate();
  },
  serialize(value): string {
    if (!(value instanceof Date)) throw new InvalidError();

    return DateTime.fromJSDate(value).toISO();
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.INT: {
        return new Date(ast.value);
      }
      case Kind.STRING: {
        return new Date(ast.value);
      }
      default: {
        return null;
      }
    }
  },
});
