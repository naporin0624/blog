import { db } from "~/adapters/db";

export const context = {
  db: db,
};

export type Context = typeof context;
