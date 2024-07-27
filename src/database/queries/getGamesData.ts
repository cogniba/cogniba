import { and, desc, eq, gte, lte } from "drizzle-orm";
import { db } from "@/database/db";
import { games } from "../schemas/games";
import getUser from "./getUser";

export default async function getGamesData(fromDate: Date, toDate: Date) {
  const { id: userId } = await getUser();

  if (!userId) {
    throw new Error("User not found");
  }

  const gamesData = await db
    .select({
      level: games.level,
      correctHits: games.correctHits,
      incorrectHits: games.incorrectHits,
      missedHits: games.missedHits,
      timeSpent: games.timeSpent,
      date: games.createdAt,
    })
    .from(games)
    .where(
      and(
        eq(games.userId, userId),
        gte(games.createdAt, fromDate),
        lte(games.createdAt, toDate),
      ),
    )
    .orderBy(desc(games.createdAt));

  return gamesData;
}
