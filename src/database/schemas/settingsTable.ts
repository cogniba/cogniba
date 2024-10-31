import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import { profilesTable } from "./profilesTable";

export const settingsTable = pgTable("settings", {
  id: uuid("id")
    .primaryKey()
    .references(() => profilesTable.id, { onDelete: "cascade" })
    .notNull(),

  showFeedback: boolean("show_feedback").notNull(),
});

export type SettingsType = InferSelectModel<typeof settingsTable>;
