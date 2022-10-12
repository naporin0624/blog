import axios from "axios";

import { directUpload } from "./cloudflare/images";

import type FormData from "form-data";

export const uploadImage = async (formData: FormData): Promise<string> => {
  const uploadURL = await directUpload();
  const response = await axios.post(uploadURL, formData);

  const variants: string[] = response.data.result.variants;

  const thumbnail = variants.find((url) => url.endsWith("thumbnail"));
  if (!thumbnail) throw new Error();

  return thumbnail;
};
