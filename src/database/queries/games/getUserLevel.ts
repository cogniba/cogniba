import getSessionUser from "@/database/queries/users/getSessionUser";

import { desc, eq } from "drizzle-orm";
import { db } from "@/database/db";
import { gamesTable } from "@/database/schemas/gamesTable";

export default async function getUserLevel(): Promise<number> {
  const { id: userId } = await getSessionUser();

  const level = await db
    .select()
    .from(gamesTable)
    .where(eq(gamesTable.userId, userId))
    .orderBy(desc(gamesTable.createdAt))
    .limit(1)
    .then((res) => (res.length === 1 ? res[0].newLevel : 1));

  return level;
}
