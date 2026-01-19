type LevelDisplayProps = {
  level: number;
};
export default function LevelDisplay({ level }: LevelDisplayProps) {
  return (
    <div
      className="xs:text-[8cqmin] relative rounded-[0.75cqmin] border border-orange-300/50 bg-orange-200 px-[5cqmin] py-[1cqmin] text-[9cqmin] font-semibold shadow-sm select-none sm:text-[7cqmin] md:text-[6cqmin] dark:border-orange-800 dark:bg-orange-900"
      id="game-level-display"
    >
      <h1>Level {level}</h1>
    </div>
  );
}
