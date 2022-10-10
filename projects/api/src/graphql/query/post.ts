import { endOfDay, startOfDay } from "date-fns";
import { arg, extendType, list, nonNull } from "nexus";

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
      authorize(root, args, { db }) {
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
            ...(where?.tag
              ? { tag: { every: { name: { contains: where.tag } } } }
              : {}),
            ...(where?.title ? { title: { contains: where.title } } : {}),
          },
          orderBy: {
            publishedAt: order?.publishedAt ?? undefined,
            title: order?.title ?? undefined,
          },
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
                ...(where?.tag
                  ? { tag: { every: { name: { contains: where.tag } } } }
                  : {}),
                ...(where?.title ? { title: { contains: where.title } } : {}),
              },
            ],
          },
          orderBy: {
            publishedAt: order?.publishedAt ?? undefined,
            title: order?.title ?? undefined,
          },
        });

        return posts;
      },
    });
  },
});
