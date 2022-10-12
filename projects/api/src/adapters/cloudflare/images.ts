import Axios from "axios";

const axios = Axios.create({
  baseURL: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_ID}/images/v2`,
  headers: {
    Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_API_KEY}`,
  },
});

export const directUpload = async (): Promise<string> => {
  const response = await axios.post("/direct_upload");

  return response.data["result"]["uploadURL"];
};

export const deliveryURL = (uploadId: string): string => {
  return `${process.env.CLOUDFLARE_IMAGE_DELIVERY_URL}/${uploadId}`;
};
