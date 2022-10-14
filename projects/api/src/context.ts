import { db } from "~/adapters/db";

import { cloudflareImages } from "./adapters/cloudflare/images";
import { uploadImage } from "./adapters/upload-image";

export const context = {
  db: db,
  uploadImage,
  cloudflareImages,
};

export type Context = typeof context;
