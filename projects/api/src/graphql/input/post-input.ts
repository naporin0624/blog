import { inputObjectType } from "nexus";

export const CreatePostInput = inputObjectType({
  name: "CreatePostInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("body");
    t.date("publishedAt");
    t.nonNull.list.nonNull.int("tag");
  },
});

export const UpdatePostInput = inputObjectType({
  name: "UpdatePostInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("title");
    t.string("body");
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
