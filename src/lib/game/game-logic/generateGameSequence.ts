import gameConfig from "@/config/gameConfig";
import getTargetsCount from "./getTargetsCount";

export default function generateGameSequence(level: number): number[] {
  const gameSequence = [];
  const { parameters } = gameConfig;

  for (let i = 0; i < parameters.baseSequenceLength + level; i++) {
    gameSequence.push(Math.trunc(Math.random() * 8));
  }

  let targetsCount = getTargetsCount(gameSequence, level);

  while (targetsCount !== parameters.numTargets) {
    const randomIndex = Math.trunc(
      Math.random() * (gameSequence.length - level) + level,
    );

    if (
      targetsCount > parameters.numTargets &&
      gameSequence[randomIndex] === gameSequence[randomIndex - level]
    ) {
      gameSequence[randomIndex] = Math.trunc(Math.random() * 8);
    } else if (
      targetsCount < parameters.numTargets &&
      gameSequence[randomIndex] !== gameSequence[randomIndex - level]
    ) {
      gameSequence[randomIndex] = gameSequence[randomIndex - level];
    }

    targetsCount = getTargetsCount(gameSequence, level);
  }

  return gameSequence;
}
