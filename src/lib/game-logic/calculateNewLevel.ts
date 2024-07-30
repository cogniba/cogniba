import {
  gameDecreaseLevelThreshold,
  gameIncreaseLevelThreshold,
} from "@/settings/constants";
import getHitStatistics from "./getHitStatistics";

export default function calculateNewLevel(
  correctHitSequence: boolean[],
  playerHitSequence: boolean[],
  level: number,
): number {
  const { correctHits, incorrectHits, missedHits } = getHitStatistics(
    correctHitSequence,
    playerHitSequence,
  );

  const ratio = correctHits / (correctHits + incorrectHits + missedHits);
  let newLevel = level;

  if (ratio <= gameDecreaseLevelThreshold) {
    newLevel = Math.max(1, level - 1);
  } else if (ratio >= gameIncreaseLevelThreshold) {
    newLevel = level + 1;
  }

  return newLevel;
}
