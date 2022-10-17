import rgba from "color-rgba";
import colorstring from "color-string";
import { Kind } from "graphql";
import { scalarType } from "nexus";

import { InvalidError } from "~/shared/error";

export const ColorScalar = scalarType({
  name: "Color",
  asNexusMethod: "color",
  sourceType: "string",
  deprecation: "hex color string",
  parseValue(value) {
    if (typeof value !== "string") throw new InvalidError();
    const parsed = rgba(value);
    const [r, g, b, a] = parsed ?? [];
    if (r == undefined || g === undefined || b === undefined || a === undefined) {
      throw new InvalidError();
    }

    return colorstring.to.hex([r, g, b, a]);
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING: {
        return ast.value;
      }
      default: {
        return null;
      }
    }
  },
});
