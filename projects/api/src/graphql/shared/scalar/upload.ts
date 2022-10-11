import { join } from "path";

import { GraphQLUpload } from "graphql-upload-ts";
import { asNexusMethod } from "nexus";

import type { FileUpload } from "graphql-upload-ts";

export type Upload = Promise<FileUpload>;
export const Upload = asNexusMethod(GraphQLUpload, "upload", {
  module: join(__dirname, "./upload.ts"),
  export: "Upload",
});
