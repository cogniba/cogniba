import { db } from "@/database/db";
import getSessionUser from "../users/getSessionUser";
import { games } from "@/database/schemas/games";
import { desc, eq } from "drizzle-orm";

export default async function getUserMaxLevel(): Promise<number> {
  const { id: userId } = await getSessionUser();

  const level = await db
    .select()
    .from(games)
    .where(eq(games.userId, userId))
    .orderBy(desc(games.newLevel))
    .limit(1)
    .then((res) => (res.length === 1 ? res[0].newLevel : 1));

  return level;
}
