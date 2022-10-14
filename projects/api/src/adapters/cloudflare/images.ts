import aspida from "@aspida/axios";
import axios from "axios";

import api from "./images/$api";

export const cloudflareImages = api(
  aspida(axios, {
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_API_KEY}`,
    },
  })
);

export const deliveryURL = (uploadId: string): string => {
  return `${process.env.CLOUDFLARE_IMAGE_DELIVERY_URL}/${uploadId}`;
};
