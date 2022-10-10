import { arg, extendType, nonNull } from "nexus";

export const TagMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTag", {
      type: nonNull("Tag"),
      args: { data: nonNull(arg({ type: "CreateTagInput" })) },
      authorize(root, args, { db }) {
        return false;
      },
      async resolve(source, { data }, { db }) {
        return db.tag.create({ data });
      },
    });
  },
});
