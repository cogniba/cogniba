interface LevelDisplayProps {
  level: number;
}
export default function LevelDisplay({ level }: LevelDisplayProps) {
  return (
    <div
      className="relative select-none rounded-[0.75cqmin] border border-orange-300/50 bg-orange-200 px-[5cqmin] py-[1cqmin] text-[9cqmin] font-semibold shadow-sm dark:border-orange-800 dark:bg-orange-900 xs:text-[8cqmin] sm:text-[7cqmin] md:text-[6cqmin]"
      id="game-level-display"
    >
      <h1>Level {level}</h1>
    </div>
  );
}
