export default function getCorrectHitSequence(
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
