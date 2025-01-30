export default function getTargetsCount(
  sequence: number[],
  level: number,
): number {
  let count = 0;

  for (let i = level; i < sequence.length; i++) {
    if (sequence[i] === sequence[i - level]) {
      count++;
    }
  }

  return count;
}
