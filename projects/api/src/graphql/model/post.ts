import { list, nonNull, objectType } from "nexus";

export const PostType = objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("body");
    t.date("publishedAt");
    t.date("createdAt");
    t.date("updatedAt");

    t.field("tags", {
      type: list(nonNull("Tag")),
      async resolve(source, arg, { db }) {
        if (!source.id) return [];

        try {
          return db.tag.findMany({ where: { postId: source.id } });
        } catch {
          return [];
        }
      },
    });
  },
});
