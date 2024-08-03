interface LevelDisplayProps {
  level: number | null;
}
export default function LevelDisplay({ level }: LevelDisplayProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-[0.5cqmin] border border-orange-300/50 bg-orange-200 px-[4.5cqmin] py-[2cqmin] shadow-sm dark:border-orange-800 dark:bg-orange-900">
        <h1 className="text-[5.725cqmin] font-semibold leading-[5.725cqmin] text-slate-950 dark:text-orange-50">
          Level {level ? level : 0}
        </h1>
      </div>
    </div>
  );
}
