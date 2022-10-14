import { enumType } from "nexus";

export const ImageProvider = enumType({
  name: "ImageProvider",
  members: ["cloudflare"],
  description: "Name of the service to which the image will be delivered",
});
