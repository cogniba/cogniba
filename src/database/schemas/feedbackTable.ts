import { InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, uuid, text, pgEnum } from "drizzle-orm/pg-core";
import { profilesTable } from "./profilesTable";

export const feedbackTypeEnum = pgEnum("feedback_type", [
  "bug",
  "feature",
  "other",
]);

export const feedbackTable = pgTable("feedback", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid("user_id")
    .references(() => profilesTable.userId, { onDelete: "cascade" })
    .notNull(),

  type: feedbackTypeEnum("type").notNull(),
  message: text("message").notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type FeedbackType = InferSelectModel<typeof feedbackTable>;
