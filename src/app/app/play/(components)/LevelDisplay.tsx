interface LevelDisplayProps {
  level: number;
}
export default function LevelDisplay({ level }: LevelDisplayProps) {
  return (
    <div
      className="rounded-[0.75cqmin] border border-orange-300/50 bg-orange-200 px-[5cqmin] py-[1cqmin] text-[9cqmin] font-semibold text-slate-950 shadow-sm dark:border-orange-800 dark:bg-orange-900 dark:text-orange-50 xs:text-[8cqmin] sm:text-[7cqmin] md:text-[6cqmin]"
      id="level-display"
    >
      <h1>Level {level}</h1>
    </div>
  );
}
