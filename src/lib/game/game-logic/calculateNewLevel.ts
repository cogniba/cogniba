import getHitStatistics from "@/lib/game/game-logic/getHitStatistics";
import calculateAccuracy from "@/lib/game/game-logic/calculateAccuracy";
import gameConfig from "@/config/gameConfig";

export default function calculateNewLevel(
  correctHitSequence: boolean[],
  playerHitSequence: boolean[],
  level: number,
): number {
  const { parameters } = gameConfig;
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

  if (accuracy <= parameters.decreaseLevelThreshold) {
    newLevel = Math.max(1, level - 1);
  } else if (accuracy >= parameters.increaseLevelThreshold) {
    newLevel = level + 1;
  }

  return newLevel;
}
