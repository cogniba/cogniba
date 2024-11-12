import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import { profilesTable } from "./profilesTable";

export const settingsTable = pgTable("settings", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => profilesTable.userId, { onDelete: "cascade" })
    .notNull(),

  showFeedback: boolean("show_feedback").default(true).notNull(),
});

export type SettingsType = InferSelectModel<typeof settingsTable>;
