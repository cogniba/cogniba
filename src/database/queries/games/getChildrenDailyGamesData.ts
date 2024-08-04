import { avg, count, inArray, sum } from "drizzle-orm";
import { db } from "@/database/db";
import { games } from "@/database/schemas/games";
import { date } from "@/database/queries/functions";
import { UserType } from "@/database/schemas/auth";
import { DailyGamesData } from "./getUserDailyGamesData";

export default async function getChildrenDailyGamesData(
  children: UserType[],
): Promise<DailyGamesData[]> {
  const childrenIds = children.map((child) => child.id);

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
    .where(inArray(games.userId, childrenIds))
    .groupBy(date(games.createdAt), games.userId)
    .orderBy(date(games.createdAt));

  const childrenGamesData = children.map((child) =>
    gamesData.filter((game) => game.userId === child.id),
  );

  return childrenGamesData;
}
