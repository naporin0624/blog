import { list, nonNull, objectType } from "nexus";

export const TagType = objectType({
  name: "Tag",
  definition(t) {
    t.int("id");
    t.string("name");
    t.color("color");

    t.field("posts", {
      type: list(nonNull("Post")),
      async resolve(source, args, { db }) {
        if (!source.id) return [];

        return db.post.findMany({
          where: { tag: { every: { id: { equals: source.id } } } },
        });
      },
    });
  },
});
