import gameConfig from "@/config/gameConfig";
import getTargetsCount from "./getTargetsCount";

export default function generateGameSequence(level: number): number[] {
  const gameSequence: number[] = [];
  const { parameters } = gameConfig;

  for (let i = 0; i < parameters.baseSequenceLength + level; i++) {
    gameSequence.push(Math.trunc(Math.random() * 8));
  }

  let targetsCount = getTargetsCount(gameSequence, level);

  while (targetsCount !== parameters.numTargets) {
    const randomIndex = Math.trunc(
      Math.random() * (gameSequence.length - level) + level,
    );

    const previousIndex = randomIndex - level;
    const currentValue = gameSequence[randomIndex];
    const previousValue = gameSequence[previousIndex];

    if (
      typeof currentValue === "number" &&
      typeof previousValue === "number" &&
      targetsCount > parameters.numTargets &&
      currentValue === previousValue
    ) {
      gameSequence[randomIndex] = Math.trunc(Math.random() * 8);
    } else if (
      typeof currentValue === "number" &&
      typeof previousValue === "number" &&
      targetsCount < parameters.numTargets &&
      currentValue !== previousValue
    ) {
      gameSequence[randomIndex] = previousValue;
    }

    targetsCount = getTargetsCount(gameSequence, level);
  }

  return gameSequence;
}
