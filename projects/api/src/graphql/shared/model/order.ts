import { enumType } from "nexus";

export const Order = enumType({
  name: "Order",
  members: ["asc", "desc"],
  description: "",
});
