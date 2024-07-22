import { db } from "../db";
import { games } from "../schemas/games";
import getUserId from "./getUserId";

export default async function insertGame(
  level: number,
  newLevel: number,
  correctHits: number,
  incorrectHits: number,
  missedHits: number,
) {
  const userId = await getUserId();

  await db.insert(games).values({
    userId,
    level,
    newLevel,
    correctHits,
    incorrectHits,
    missedHits,
  });
}
