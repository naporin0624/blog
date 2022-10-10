import { extendType, list, nonNull } from "nexus";

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("posts", {
      type: list(nonNull("Post")),
      async resolve(source, args, { db }) {
        const posts = await db.post.findMany();

        return posts;
      },
    });
  },
});
