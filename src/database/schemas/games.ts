import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { usersTable } from "./auth";

export const gamesTable = pgTable("games_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  level: integer("level").notNull(),
  newLevel: integer("new_level").notNull(),

  correctHits: integer("correct_hits").notNull(),
  incorrectHits: integer("incorrect_hits").notNull(),
  missedHits: integer("missed_hits").notNull(),

  timePlayed: integer("time_played").notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type GameType = InferSelectModel<typeof gamesTable>;
