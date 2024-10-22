import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  timestamp,
  text,
  pgTable,
  pgSchema,
  uuid,
} from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const profilesTable = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  email: text("email").unique().notNull(),
  full_name: text("full_name").notNull(),

  hasFinishedTutorial: boolean("has_finished_tutorial")
    .notNull()
    .default(false),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type UserType = InferSelectModel<typeof profilesTable>;
