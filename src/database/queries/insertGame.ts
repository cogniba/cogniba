"use server";

import { db } from "../db";
import { games } from "../schemas/games";
import getUser from "./getUser";

export default async function insertGame(
  level: number,
  newLevel: number,
  correctHits: number,
  incorrectHits: number,
  missedHits: number,
  timePlayed: number,
) {
  const { id: userId } = await getUser();

  if (!userId) {
    throw new Error("User not found");
  }

  await db.insert(games).values({
    userId,
    level,
    newLevel,
    correctHits,
    incorrectHits,
    missedHits,
    timePlayed,
  });
}
