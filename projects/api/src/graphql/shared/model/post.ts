import { list, nonNull, objectType } from "nexus";

export const PostType = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("body");
    t.nonNull.url("thumbnail");
    t.date("publishedAt");
    t.nonNull.date("createdAt");
    t.nonNull.date("updatedAt");

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
