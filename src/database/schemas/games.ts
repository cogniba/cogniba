import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { InferSelectModel } from "drizzle-orm";

export const games = pgTable("games", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  level: integer("level").notNull(),
  newLevel: integer("newLevel").notNull(),

  correctHits: integer("correctHits").notNull(),
  incorrectHits: integer("incorrectHits").notNull(),
  missedHits: integer("missedHits").notNull(),

  timePlayed: integer("timePlayed").notNull(),

  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export type Games = InferSelectModel<typeof games>;
