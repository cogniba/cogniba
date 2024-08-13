import getSessionUser from "@/database/queries/users/getSessionUser";

import { and, desc, eq, gte, lte } from "drizzle-orm";
import { db } from "@/database/db";
import { games, type GameType } from "@/database/schemas/games";

export default async function getGamesData(
  startDate: Date,
  endDate: Date,
): Promise<GameType[]> {
  const { id: userId } = await getSessionUser();

  const gamesData = await db
    .select()
    .from(games)
    .where(
      and(
        eq(games.userId, userId),
        gte(games.createdAt, startDate),
        lte(games.createdAt, endDate),
      ),
    )
    .orderBy(desc(games.createdAt));

  return gamesData;
}
