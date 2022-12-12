import FormData from "form-data";
import { extendType, arg, nonNull } from "nexus";

import type { UploadResult } from "~/adapters/cloudflare/upload-image";

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: nonNull("Post"),
      args: { data: nonNull(arg({ type: "CreatePostInput" })) },
      authorize() {
        return true;
      },
      async resolve(source, { data }, { db, cloudflare }) {
        const { tag, thumbnail, ...rest } = data;
        const file = await thumbnail;
        const formData = new FormData();
        formData.append("file", file.createReadStream());
        const result = await cloudflare.uploadImage(formData);

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
            tag: { create: tag?.map((id) => ({ Tag: { connect: { id } } })) ?? [] },
          },
          include: { thumbnail: true, tag: { select: { Tag: true } } },
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
      authorize() {
        return true;
      },
      async resolve(source, { data, where }, { db, cloudflare }) {
        const { id } = where;
        const { thumbnail, ...rest } = data;
        let uploadResult: UploadResult | undefined = undefined;
        if (thumbnail) {
          const file = await thumbnail;
          const formData = new FormData();
          formData.append("file", file.createReadStream());
          uploadResult = await cloudflare.uploadImage(formData);
        }

        const post = await db.post.update({
          where: { id },
          data: {
            ...(rest.title ? { title: rest.title } : {}),
            ...(rest.body ? { body: rest.body } : {}),
            ...(rest.private ? { private: rest.private } : {}),
            ...(rest.publishedAt ? { publishedAt: rest.publishedAt } : {}),
            ...(uploadResult ? { thumbnail: { create: { provider: "cloudflare", imageId: uploadResult.id } } } : {}),
            tag: { create: rest.tag?.map((id) => ({ Tag: { connect: { id } } })) ?? [] },
          },
          include: { thumbnail: true },
        });

        return post;
      },
    });

    t.field("deletePost", {
      type: nonNull("Boolean"),
      args: { where: nonNull(arg({ type: "PostUniqueWhereInput" })) },
      authorize() {
        return true;
      },
      async resolve(source, { where }, { db, cloudflare }) {
        await db.$transaction(async (db) => {
          const post = await db.post.delete({ where, include: { thumbnail: true } });
          await cloudflare.images.v1._imageId(post.thumbnail.imageId).$delete();
          await db.image.delete({ where: { id: post.imageId } });
        });

        return true;
      },
    });

    t.field("publishPost", {
      type: nonNull("Boolean"),
      args: { where: nonNull(arg({ type: "PostUniqueWhereInput" })) },
      authorize() {
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
