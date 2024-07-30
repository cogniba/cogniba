import {
  gameBaseSequenceLength,
  gameDelayBeforeStart,
  gameHiddenSquareDuration,
  gameVisibleSquareDuration,
} from "@/settings/constants";
import calculateNewLevel from "./calculateNewLevel";
import getHitStatistics from "./getHitStatistics";
import insertGame from "@/database/queries/games/insertGame";

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
