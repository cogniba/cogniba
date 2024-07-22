import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { games } from "../schemas/games";
import getUserId from "./getUserId";

export default async function getUserLevel() {
  const userId = await getUserId();

  const level = await db
    .select()
    .from(games)
    .where(eq(games.userId, userId))
    .orderBy(desc(games.createdAt))
    .limit(1)
    .then((res) => res[0].newLevel ?? 1);

  return level;
}
