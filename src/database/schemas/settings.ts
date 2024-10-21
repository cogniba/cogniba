import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "./auth";

export const settingsTable = pgTable("settings_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  showFeedback: boolean("show_feedback").notNull(),
});

export type SettingsType = InferSelectModel<typeof settingsTable>;
