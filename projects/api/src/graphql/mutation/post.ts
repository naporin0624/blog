import { extendType, arg, nonNull } from "nexus";

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: nonNull("Post"),
      args: { data: nonNull(arg({ type: "CreatePostInput" })) },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(source, { data }, { db }) {
        const { tag, ...rest } = data;

        const post = await db.post.create({
          data: {
            ...rest,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            tag: { connect: (tag ?? []).map((t) => ({ id: t })) },
          },
        });

        return post;
      },
    });

    t.field("updatePost", {
      type: nonNull("Post"),
      args: { data: nonNull(arg({ type: "UpdatePostInput" })) },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(source, { data }, { db }) {
        const { id, ...rest } = data;
        await db.post.update({
          where: { id },
          data: {
            ...(rest.title ? { title: rest.title } : {}),
            ...(rest.body ? { body: rest.body } : {}),
            ...(rest.publishedAt ? { publishedAt: rest.publishedAt } : {}),
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            tag: { connect: rest.tag?.map((id) => ({ id })) ?? [] },
          },
        });

        return {
          ...data,
          publishedAt: data.publishedAt ?? new Date(),
        };
      },
    });

    t.field("deletePost", {
      type: nonNull("Boolean"),
      args: { data: nonNull(arg({ type: "PostUniqueWhereInput" })) },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(source, { data }, { db }) {
        try {
          await db.post.delete({ where: data });

          return true;
        } catch {
          return false;
        }
      },
    });

    t.field("publishPost", {
      type: nonNull("Boolean"),
      args: { data: nonNull(arg({ type: "PostUniqueWhereInput" })) },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(_source, { data }, { db }) {
        try {
          await db.post.update({
            where: data,
            data: { publishedAt: new Date() },
          });

          return true;
        } catch {
          return false;
        }
      },
    });
  },
});
