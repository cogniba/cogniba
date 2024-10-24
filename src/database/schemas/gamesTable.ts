import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { profilesTable } from "./profilesTable";

export const gamesTable = pgTable("games", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid("user_id")
    .notNull()
    .references(() => profilesTable.id, { onDelete: "cascade" }),

  level: integer("level").notNull(),
  newLevel: integer("new_level").notNull(),

  correctHits: integer("correct_hits").notNull(),
  incorrectHits: integer("incorrect_hits").notNull(),
  missedHits: integer("missed_hits").notNull(),

  timePlayed: integer("time_played").notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type GameType = InferSelectModel<typeof gamesTable>;
