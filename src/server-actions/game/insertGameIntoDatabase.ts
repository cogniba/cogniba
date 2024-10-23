"use server";

import calculateNewLevel from "@/lib/game-logic/calculateNewLevel";
import getHitStatistics from "@/lib/game-logic/getHitStatistics";
import insertGame from "@/database/queries/games/insertGame";

import {
  gameBaseSequenceLength,
  gameDelayBeforeStart,
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";

export default async function insertGameIntoDatabase(
  correctHitSequence: boolean[],
  playerHitSequence: boolean[],
  level: number,
) {
  const { correctHits, incorrectHits, missedHits } = getHitStatistics(
    correctHitSequence,
    playerHitSequence,
  );

  const newLevel = calculateNewLevel(
    correctHitSequence,
    playerHitSequence,
    level,
  );

  const timePlayed =
    (gameBaseSequenceLength + level) *
      (gameVisibleSquareDuration + gameHiddenSquareDuration) +
    gameDelayBeforeStart;

  await insertGame({
    level,
    newLevel,
    correctHits,
    incorrectHits,
    missedHits,
    timePlayed,
  });
}
