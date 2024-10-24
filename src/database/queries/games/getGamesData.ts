import getSessionUser from "@/database/queries/users/getSessionUser";

import { and, desc, eq, gte, lte } from "drizzle-orm";
import { db } from "@/database/db";
import { gamesTable, type GameType } from "@/database/schemas/gamesTable";

export default async function getGamesData(
  startDate: Date,
  endDate: Date,
): Promise<GameType[]> {
  const { id: userId } = await getSessionUser();

  const gamesData = await db
    .select()
    .from(gamesTable)
    .where(
      and(
        eq(gamesTable.userId, userId),
        gte(gamesTable.createdAt, startDate),
        lte(gamesTable.createdAt, endDate),
      ),
    )
    .orderBy(desc(gamesTable.createdAt));

  return gamesData;
}
