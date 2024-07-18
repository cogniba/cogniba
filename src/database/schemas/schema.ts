import { pgEnum, pgTable, serial, text, PgArray } from "drizzle-orm/pg-core";

export const typeEnum = pgEnum("type", ["parent", "child"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  email: text("email"),
  type: typeEnum("type"),
  children: text("children").array(),
});
