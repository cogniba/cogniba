export default function getHitStatistics(
  correctHitSequence: boolean[],
  playerHitSequence: boolean[],
): { correctHits: number; incorrectHits: number; missedHits: number } {
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
