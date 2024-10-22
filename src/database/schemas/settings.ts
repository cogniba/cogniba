import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import { profilesTable } from "./profiles";

export const settingsTable = pgTable("settings", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid("user_id")
    .notNull()
    .references(() => profilesTable.id, { onDelete: "cascade" }),

  showFeedback: boolean("show_feedback").notNull(),
});

export type SettingsType = InferSelectModel<typeof settingsTable>;
