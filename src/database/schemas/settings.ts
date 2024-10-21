import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./auth";

export const settingsTable = pgTable("settings_table", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  showFeedback: boolean("show_feedback").notNull(),
});

export type SettingsType = InferSelectModel<typeof settingsTable>;
