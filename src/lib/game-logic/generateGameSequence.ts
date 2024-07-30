import { gameBaseSequenceLength, gameNumTargets } from "@/settings/constants";
import getTargetsCount from "./getTargetsCount";

export default function generateGameSequence(level: number): number[] {
  const gameSequence = [];

  for (let i = 0; i < gameBaseSequenceLength + level; i++) {
    gameSequence.push(Math.trunc(Math.random() * 8));
  }

  let targetsCount = getTargetsCount(gameSequence, level);

  while (targetsCount !== gameNumTargets) {
    const randomIndex = Math.trunc(
      Math.random() * (gameSequence.length - level) + level,
    );

    if (
      targetsCount > gameNumTargets &&
      gameSequence[randomIndex] === gameSequence[randomIndex - level]
    ) {
      gameSequence[randomIndex] = Math.trunc(Math.random() * 8);
    } else if (
      targetsCount < gameNumTargets &&
      gameSequence[randomIndex] !== gameSequence[randomIndex - level]
    ) {
      gameSequence[randomIndex] = gameSequence[randomIndex - level];
    }

    targetsCount = getTargetsCount(gameSequence, level);
  }

  return gameSequence;
}
