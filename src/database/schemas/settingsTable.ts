import { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { profilesTable } from "./profilesTable";

export const settingsTable = pgTable("settings", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => profilesTable.userId, { onDelete: "cascade" })
    .notNull(),
});

export type SettingsType = InferSelectModel<typeof settingsTable>;
