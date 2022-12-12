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

        const tag = await db.tag.findUniqueOrThrow({
          where: { id: source.id },
          select: {
            posts: {
              select: { Post: { include: { thumbnail: true } } },
            },
          },
        });

        return tag.posts.map((p) => p.Post);
      },
    });
  },
});
