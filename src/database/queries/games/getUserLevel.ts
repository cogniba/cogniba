import { desc, eq } from "drizzle-orm";
import { db } from "@/database/db";
import { games } from "@/database/schemas/games";
import getSessionUser from "@/database/queries/users/getSessionUser";

export default async function getUserLevel(): Promise<number> {
  const { id: userId } = await getSessionUser();

  const level = await db
    .select()
    .from(games)
    .where(eq(games.userId, userId))
    .orderBy(desc(games.createdAt))
    .limit(1)
    .then((res) => (res.length === 1 ? res[0].newLevel : 1));

  return level;
}
