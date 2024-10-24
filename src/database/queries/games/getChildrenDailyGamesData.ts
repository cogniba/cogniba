import calculateAccuracy from "@/lib/calculateAccuracy";

import { avg, count, inArray, sum } from "drizzle-orm";
import { db } from "@/database/db";
import { gamesTable } from "@/database/schemas/gamesTable";
import { date } from "@/database/queries/functions";
import type { UserType } from "@/database/schemas/profilesTable";
import type { DailyGamesData } from "./getUserDailyGamesData";

export default async function getChildrenDailyGamesData(
  children: UserType[],
): Promise<DailyGamesData[]> {
  const childrenIds = children.map((child) => child.id);

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
    .where(inArray(gamesTable.userId, childrenIds))
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

  const childrenGamesData = children.map((child) =>
    fullGamesData.filter((game) => game.userId === child.id),
  );

  return childrenGamesData;
}
