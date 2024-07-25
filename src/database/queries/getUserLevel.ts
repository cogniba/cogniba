"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { games } from "../schemas/games";
import getUser from "./getUser";

export default async function getUserLevel() {
  const { id: userId } = await getUser();

  if (!userId) {
    throw new Error("User not found");
  }

  const level = await db
    .select()
    .from(games)
    .where(eq(games.userId, userId))
    .orderBy(desc(games.createdAt))
    .limit(1)
    .then((res) => res[0]?.newLevel ?? 1);

  return level;
}
