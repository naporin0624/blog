import { list, nonNull, objectType } from "nexus";

export const TagType = objectType({
  name: "Tag",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.color("color");

    t.field("posts", {
      type: nonNull(list(nonNull("Post"))),
      async resolve(source, args, { db }) {
        if (!source.id) return [];

        return db.post.findMany({
          where: { tag: { every: { id: { equals: source.id } } } },
          include: { thumbnail: true },
        });
      },
    });
  },
});
