import FormData from "form-data";
import { extendType, arg, nonNull } from "nexus";

import type { UploadResult } from "~/adapters/upload-image";

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: nonNull("Post"),
      args: { data: nonNull(arg({ type: "CreatePostInput" })) },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(source, { data }, { db, uploadImage }) {
        const { tag, thumbnail, ...rest } = data;
        const file = await thumbnail;
        const formData = new FormData();
        formData.append("file", file.createReadStream());
        const result = await uploadImage(formData);

        const post = await db.post.create({
          data: {
            ...rest,
            private: rest.private ?? false,
            thumbnail: {
              create: {
                provider: "cloudflare",
                imageId: result.id,
              },
            },
            tag: { connect: (tag ?? []).map((t) => ({ id: t })) },
          },
          include: { thumbnail: true },
        });

        return post;
      },
    });

    t.field("updatePost", {
      type: nonNull("Post"),
      args: {
        where: nonNull(arg({ type: "PostUniqueWhereInput" })),
        data: nonNull(arg({ type: "UpdatePostInput" })),
      },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(source, { data, where }, { db, uploadImage }) {
        const { id } = where;
        const { thumbnail, ...rest } = data;
        let uploadResult: UploadResult | undefined = undefined;
        if (thumbnail) {
          const file = await thumbnail;
          const formData = new FormData();
          formData.append("file", file.createReadStream());
          uploadResult = await uploadImage(formData);
        }

        const post = await db.post.update({
          where: { id },
          data: {
            ...(rest.title ? { title: rest.title } : {}),
            ...(rest.body ? { body: rest.body } : {}),
            ...(rest.private ? { private: rest.private } : {}),
            ...(rest.publishedAt ? { publishedAt: rest.publishedAt } : {}),
            ...(uploadResult ? { thumbnail: { create: { provider: "cloudflare", imageId: uploadResult.id } } } : {}),
            tag: { connect: rest.tag?.map((id) => ({ id })) ?? [] },
          },
          include: { thumbnail: true },
        });

        return post;
      },
    });

    t.field("deletePost", {
      type: nonNull("Boolean"),
      args: { where: nonNull(arg({ type: "PostUniqueWhereInput" })) },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(source, { where }, { db, cloudflareImages }) {
        await db.$transaction(async (db) => {
          const post = await db.post.delete({ where, include: { thumbnail: true } });
          await cloudflareImages.v1._imageId(post.thumbnail.imageId).$delete();
          await db.image.delete({ where: { id: post.imageId } });
        });

        return true;
      },
    });

    t.field("publishPost", {
      type: nonNull("Boolean"),
      args: { where: nonNull(arg({ type: "PostUniqueWhereInput" })) },
      authorize(root, args, { db }) {
        return true;
      },
      async resolve(_source, { where }, { db }) {
        await db.post.update({
          where: where,
          data: { publishedAt: new Date() },
        });

        return true;
      },
    });
  },
});
