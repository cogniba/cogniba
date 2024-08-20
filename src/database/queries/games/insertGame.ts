import getSessionUser from "@/database/queries/users/getSessionUser";

import { db } from "@/database/db";
import { games } from "@/database/schemas/games";

interface insertGameProps {
  level: number;
  newLevel: number;
  correctHits: number;
  incorrectHits: number;
  missedHits: number;
  timePlayed: number;
}

export default async function insertGame({
  level,
  newLevel,
  correctHits,
  incorrectHits,
  missedHits,
  timePlayed,
}: insertGameProps): Promise<void> {
  const { id: userId } = await getSessionUser();

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
