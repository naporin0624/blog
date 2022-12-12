import { inputObjectType } from "nexus";

export const TagWhereInput = inputObjectType({
  name: "TagWhereInput",
  definition(t) {
    t.list.nonNull.int("id");
    t.list.nonNull.string("name");
    t.string("contains");
  },
});

export const TagUniqueWhereInput = inputObjectType({
  name: "TagUniqueWhereInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const CreateTagInput = inputObjectType({
  name: "CreateTagInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.color("color");
  },
});

export const UpdateTagInput = inputObjectType({
  name: "UpdateTagInput",
  definition(t) {
    t.string("name");
    t.color("color");
  },
});
