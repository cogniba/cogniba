import getSessionUser from "@/database/queries/users/getSessionUser";
import calculateAccuracy from "@/lib/calculateAccuracy";

import { avg, count, eq, sum } from "drizzle-orm";
import { db } from "@/database/db";
import { games } from "@/database/schemas/games";
import { date } from "@/database/queries/functions";

export type DailyGamesData = {
  userId: string;
  gamesPlayed: number;
  level: number;
  correctHits: number;
  incorrectHits: number;
  missedHits: number;
  accuracy: number;
  timePlayed: number;
  date: string;
}[];

export default async function getUserDailyGamesData(): Promise<DailyGamesData> {
  const { id: userId } = await getSessionUser();

  const gamesData = await db
    .select({
      userId: games.userId,
      gamesPlayed: count(games.level),
      level: avg(games.level).mapWith(Number),
      correctHits: avg(games.correctHits).mapWith(Number),
      incorrectHits: avg(games.incorrectHits).mapWith(Number),
      missedHits: avg(games.missedHits).mapWith(Number),
      timePlayed: sum(games.timePlayed).mapWith(Number),
      date: date(games.createdAt),
    })
    .from(games)
    .where(eq(games.userId, userId))
    .groupBy(date(games.createdAt), games.userId)
    .orderBy(date(games.createdAt));

  const fullGamesData = gamesData.map((data) => ({
    accuracy: calculateAccuracy({
      correctHits: data.correctHits,
      incorrectHits: data.incorrectHits,
      missedHits: data.missedHits,
    }),
    ...data,
  }));

  return fullGamesData;
}
