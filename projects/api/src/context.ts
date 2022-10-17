import { db } from "~/adapters/db";

import { cloudflare } from "./adapters/cloudflare";

// usecases 単位で DI した方がいいな〜
export const context = {
  db,
  cloudflare,
};

export type Context = typeof context;
