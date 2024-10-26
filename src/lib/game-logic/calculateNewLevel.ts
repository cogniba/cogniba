import getHitStatistics from "@/lib/game-logic/getHitStatistics";
import calculateAccuracy from "@/lib/calculateAccuracy";

import {
  gameDecreaseLevelThreshold,
  gameIncreaseLevelThreshold,
} from "@/settings/constants";

export default function calculateNewLevel(
  correctHitSequence: boolean[],
  playerHitSequence: boolean[],
  level: number,
): number {
  const { correctHits, incorrectHits, missedHits } = getHitStatistics(
    correctHitSequence,
    playerHitSequence,
  );

  const accuracy = calculateAccuracy({
    correctHits,
    incorrectHits,
    missedHits,
  });
  let newLevel = level;

  if (accuracy <= gameDecreaseLevelThreshold) {
    newLevel = Math.max(1, level - 1);
  } else if (accuracy >= gameIncreaseLevelThreshold) {
    newLevel = level + 1;
  }

  return newLevel;
}
