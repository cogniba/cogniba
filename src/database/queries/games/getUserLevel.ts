import { desc, eq } from "drizzle-orm";
import { db } from "@/database/db";
import { games } from "@/database/schemas/games";
import getUser from "@/database/queries/users/getUser";

export default async function getUserLevel(): Promise<number> {
  const { id: userId } = await getUser();

  const level = await db
    .select()
    .from(games)
    .where(eq(games.userId, userId))
    .orderBy(desc(games.createdAt))
    .limit(1)
    .then((res) => (res.length === 1 ? res[0].newLevel : 1));

  return level;
}
