import { and, avg, count, eq, gte, lte, sum } from "drizzle-orm";
import { db } from "../db";
import { games } from "../schemas/games";
import getUser from "./getUser";
import { date } from "./functions";

export default async function getDailyGamesData(
  startDate: Date,
  endDate: Date,
) {
  const { id: userId } = await getUser();

  if (!userId) {
    throw new Error("User not found");
  }

  const gamesData = await db
    .select({
      gamesPlayed: count(games.level),
      level: avg(games.level),
      correctHits: avg(games.correctHits),
      incorrectHits: avg(games.incorrectHits),
      missedHits: avg(games.missedHits),
      timeSpent: sum(games.timeSpent),
      date: date(games.createdAt),
    })
    .from(games)
    .where(
      and(
        eq(games.userId, userId),
        gte(games.createdAt, startDate),
        lte(games.createdAt, endDate),
      ),
    )
    .groupBy(date(games.createdAt))
    .orderBy(date(games.createdAt));

  return gamesData;
}
