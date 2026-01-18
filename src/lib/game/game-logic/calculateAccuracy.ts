type calculateAccuracyProps = {
  correctHits: number;
  incorrectHits: number;
  missedHits: number;
}

export default function calculateAccuracy({
  correctHits,
  incorrectHits,
  missedHits,
}: calculateAccuracyProps): number {
  return correctHits / (correctHits + incorrectHits + missedHits);
}
