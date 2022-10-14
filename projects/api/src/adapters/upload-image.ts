import axios from "axios";

import { cloudflareImages } from "./cloudflare/images";

import type FormData from "form-data";

type Response = {
  result: UploadResult;
  success: boolean;
  errors: string[];
  messages: string[];
};

export type UploadResult = {
  id: string;
  variants: string[];
};

export const uploadImage = async (formData: FormData): Promise<Response["result"]> => {
  const {
    result: { uploadURL },
  } = await cloudflareImages.v2.direct_upload.$post();
  const { data } = await axios.post<Response>(uploadURL, formData);

  return data.result;
};
