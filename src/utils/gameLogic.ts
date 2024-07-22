import insertGame from "@/database/queries/insertGame";
import {
  gameBaseSequenceLength,
  gameDecreaseLevelThreshold,
  gameIncreaseLevelThreshold,
  gameNumTargets,
} from "@/settings/constants";

function getTargetsCount(sequence: number[], level: number) {
  let count = 0;

  for (let i = level; i < sequence.length; i++) {
    if (sequence[i] === sequence[i - level]) {
      count++;
    }
  }

  return count;
}

export function generateGameSequence(level: number): number[] {
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

export function getCorrectHitSequence(
  gameSequence: number[],
  level: number,
): boolean[] {
  const correctHitSequence = [];

  for (let i = 0; i < gameSequence.length; i++) {
    if (i < level) {
      correctHitSequence.push(false);
    } else {
      correctHitSequence.push(gameSequence[i] === gameSequence[i - level]);
    }
  }

  return correctHitSequence;
}

export function getHitStatistics(
  correctHitSequence: boolean[],
  playerHitSequence: boolean[],
) {
  let correctHits = 0;
  let incorrectHits = 0;
  let missedHits = 0;

  for (let i = 0; i < correctHitSequence.length; i++) {
    if (correctHitSequence[i] && playerHitSequence[i]) {
      correctHits++;
    } else if (!correctHitSequence[i] && playerHitSequence[i]) {
      incorrectHits++;
    } else if (correctHitSequence[i] && !playerHitSequence[i]) {
      missedHits++;
    }
  }

  return { correctHits, incorrectHits, missedHits };
}

export async function insertGameIntoDatabase(
  correctHitSequence: boolean[],
  playerHitSequence: boolean[],
  level: number,
) {
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

  await insertGame(level, newLevel, correctHits, incorrectHits, missedHits);
}
