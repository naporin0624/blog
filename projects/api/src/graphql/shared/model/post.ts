import { list, nonNull, objectType } from "nexus";

export const PostType = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("body");
    t.nonNull.boolean("private");
    t.date("publishedAt");
    t.nonNull.date("createdAt");
    t.nonNull.date("updatedAt");

    t.nonNull.field("abstract", {
      type: "String",
      resolve({ body }) {
        return body.length > 128 ? `${body.slice(0, 128)}...` : body;
      },
    });

    t.nonNull.field("thumbnail", {
      type: nonNull("Image"),
    });

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
