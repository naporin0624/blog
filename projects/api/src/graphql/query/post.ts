import { endOfDay, startOfDay } from "date-fns";
import { arg, extendType, list, nonNull } from "nexus";

import { NotFoundError } from "~/shared/error";

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("posts", {
      type: list(nonNull("Post")),
      args: {
        where: arg({
          type: "PostWhereInput",
        }),
        order: arg({
          type: "PostOrderInput",
          default: { publishedAt: "desc" },
        }),
      },
      authorize() {
        return true;
      },
      async resolve(source, { where, order }, { db }) {
        const posts = await db.post.findMany({
          where: {
            ...(where?.publishedAt
              ? {
                  publishedAt: {
                    gte: startOfDay(where.publishedAt),
                    lt: endOfDay(where.publishedAt),
                  },
                }
              : {}),
            ...(where?.title ? { title: { contains: where.title } } : {}),
            ...(where?.tag ? { tag: { every: { Tag: { name: { contains: where.tag } } } } } : {}),
            private: false,
          },
          orderBy: {
            publishedAt: order?.publishedAt ?? undefined,
            title: order?.title ?? undefined,
          },
          include: { thumbnail: true },
        });

        return posts;
      },
    });

    t.field("publishedPosts", {
      type: list(nonNull("Post")),
      args: {
        where: arg({
          type: "PostWhereInput",
        }),
        order: arg({
          type: "PostOrderInput",
          default: { publishedAt: "desc" },
        }),
      },
      async resolve(source, { where, order }, { db }) {
        const posts = await db.post.findMany({
          where: {
            AND: [
              { publishedAt: { lte: new Date() } },
              {
                ...(where?.publishedAt
                  ? {
                      publishedAt: {
                        gte: startOfDay(where.publishedAt),
                        lt: endOfDay(where.publishedAt),
                      },
                    }
                  : {}),
                ...(where?.tag ? { tag: { every: { Tag: { name: { contains: where.tag } } } } } : {}),
                ...(where?.title ? { title: { contains: where.title } } : {}),
                private: false,
              },
            ],
          },
          orderBy: {
            publishedAt: order?.publishedAt ?? undefined,
            title: order?.title ?? undefined,
          },
          include: { thumbnail: true },
        });

        return posts;
      },
    });

    t.field("post", {
      type: nonNull("Post"),
      args: { where: nonNull(arg({ type: "PostUniqueWhereInput" })) },
      async resolve(source, { where }, { db }) {
        const post = await db.post.findUnique({ where, include: { thumbnail: true } });
        if (!post) throw new NotFoundError();

        return post;
      },
    });
  },
});
