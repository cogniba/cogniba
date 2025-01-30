import { InferSelectModel } from "drizzle-orm";
import { timestamp, text, pgTable, pgSchema, uuid } from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const profilesTable = pgTable("profiles", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  email: text("email").unique().notNull(),
  fullName: text("full_name").notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type ProfileType = InferSelectModel<typeof profilesTable>;
