export default function calculateReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 225;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}
