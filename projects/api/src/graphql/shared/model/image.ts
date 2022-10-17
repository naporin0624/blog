import { objectType } from "nexus";

export const ImageType = objectType({
  name: "Image",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("imageId");
    t.nonNull.field("blur", {
      type: "String",
      resolve(source, args, { cloudflare }) {
        return cloudflare.deliveryURL(source.imageId, "blogThumbBlur");
      },
    });
    t.nonNull.field("small", {
      type: "String",
      resolve(source, args, { cloudflare }) {
        return cloudflare.deliveryURL(source.imageId, "blogThumbSmall");
      },
    });
    t.nonNull.field("medium", {
      type: "String",
      resolve(source, args, { cloudflare }) {
        return cloudflare.deliveryURL(source.imageId, "blogThumbMedium");
      },
    });
    t.nonNull.field("large", {
      type: "String",
      resolve(source, args, { cloudflare }) {
        return cloudflare.deliveryURL(source.imageId, "blogThumbLarge");
      },
    });
  },
});
