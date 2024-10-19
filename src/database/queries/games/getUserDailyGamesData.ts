import getSessionUser from "@/database/queries/users/getSessionUser";
import calculateAccuracy from "@/lib/calculateAccuracy";

import { avg, count, eq, sum } from "drizzle-orm";
import { db } from "@/database/db";
import { gamesTable } from "@/database/schemas/games";
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
      userId: gamesTable.userId,
      gamesPlayed: count(gamesTable.level),
      level: avg(gamesTable.level).mapWith(Number),
      correctHits: avg(gamesTable.correctHits).mapWith(Number),
      incorrectHits: avg(gamesTable.incorrectHits).mapWith(Number),
      missedHits: avg(gamesTable.missedHits).mapWith(Number),
      timePlayed: sum(gamesTable.timePlayed).mapWith(Number),
      date: date(gamesTable.createdAt),
    })
    .from(gamesTable)
    .where(eq(gamesTable.userId, userId))
    .groupBy(date(gamesTable.createdAt), gamesTable.userId)
    .orderBy(date(gamesTable.createdAt));

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
