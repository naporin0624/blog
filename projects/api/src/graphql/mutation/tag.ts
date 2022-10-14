import { arg, extendType, nonNull } from "nexus";

export const TagMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTag", {
      type: nonNull("Tag"),
      args: { data: nonNull(arg({ type: "CreateTagInput" })) },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(source, { data }, { db }) {
        return db.tag.create({ data });
      },
    });

    t.field("updateTag", {
      type: nonNull("Tag"),
      args: {
        where: nonNull(arg({ type: "TagUniqueWhereInput" })),
        data: nonNull(arg({ type: "UpdateTagInput" })),
      },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(source, { where, data }, { db }) {
        return db.tag.update({
          where,
          data: {
            ...(data.name ? { name: data.name } : {}),
            ...(data.color ? { color: data.color } : {}),
          },
        });
      },
    });

    t.field("deleteTag", {
      type: "Boolean",
      args: { where: nonNull(arg({ type: "TagUniqueWhereInput" })) },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(source, { where }, { db }) {
        await db.tag.delete({ where });

        return true;
      },
    });
  },
});
