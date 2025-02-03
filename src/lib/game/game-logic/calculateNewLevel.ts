import getHitStatistics from "@/lib/game/game-logic/getHitStatistics";
import calculateAccuracy from "@/lib/game/game-logic/calculateAccuracy";

import {
  DECREASE_LEVEL_THRESHOLD,
  INCREASE_LEVEL_THRESHOLD,
} from "@/config/game";

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

  if (accuracy <= DECREASE_LEVEL_THRESHOLD) {
    newLevel = Math.max(1, level - 1);
  } else if (accuracy >= INCREASE_LEVEL_THRESHOLD) {
    newLevel = level + 1;
  }

  return newLevel;
}
