/* eslint-disable @typescript-eslint/no-empty-interface */
interface Env {
  PORT: string | undefined;
}

declare namespace NodeJS {
  interface ProcessEnv extends Env {}
}

interface ImportMetaEnv extends Env {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
