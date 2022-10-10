import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "error" },
    { emit: "stdout", level: "info" },
    { emit: "stdout", level: "warn" },
  ],
});

if (process.env.NODE_ENV === "development") {
  db.$on("query", (e) => {
    console.table({
      Query: e.query,
      Params: e.params,
      Duration: `${e.duration}ms`,
    });
  });
}
