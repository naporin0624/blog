import { inputObjectType } from "nexus";

export const CreatePostInput = inputObjectType({
  name: "CreatePostInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("body");
    t.nonNull.upload("thumbnail");
    t.date("publishedAt");
    t.list.nonNull.int("tag");
  },
});

export const UpdatePostInput = inputObjectType({
  name: "UpdatePostInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("title");
    t.string("body");
    t.url("thumbnail");
    t.list.nonNull.int("tag", { default: [] });
    t.date("publishedAt");
  },
});

export const PostUniqueWhereInput = inputObjectType({
  name: "PostUniqueWhereInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const PostOrderInput = inputObjectType({
  name: "PostOrderInput",
  definition(t) {
    t.field("title", { type: "Order" });
    t.field("publishedAt", { type: "Order" });
  },
});

export const PostWhereInput = inputObjectType({
  name: "PostWhereInput",
  definition(t) {
    t.string("title");
    t.string("tag");
    t.date("publishedAt");
  },
});
