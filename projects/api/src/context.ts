import { db } from "~/adapters/db";

import { uploadImage } from "./adapters/upload-image";

export const context = {
  db: db,
  upload: {
    image: uploadImage,
  },
};

export type Context = typeof context;
