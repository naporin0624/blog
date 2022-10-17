import aspida from "@aspida/axios";
import axios from "axios";

import api from "./images/$api";

/**
 * @package
 */
export const images = api(
  aspida(axios, {
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_API_KEY}`,
    },
  })
);

/**
 * @package
 */
export const deliveryURL = (uploadId: string, variant: string): string => {
  return `${process.env.CLOUDFLARE_IMAGE_DELIVERY_URL}/${uploadId}/${variant}`;
};
