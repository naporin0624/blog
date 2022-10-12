/* eslint-disable @typescript-eslint/no-empty-interface */
interface Env {
  PORT: string | undefined;
  HOST: string | undefined;
  NODE_ENV: "development" | "production";
  CLOUDFLARE_IMAGES_API_KEY: string;
  CLOUDFLARE_IMAGE_DELIVERY_URL: string;
  CLOUDFLARE_IMAGES_ACCOUNT_ID: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends Env {}
}

interface ImportMetaEnv extends Env {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type NonEmptyArray<T> = [T, ...T[]];
