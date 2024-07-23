interface LevelDisplayProps {
  level: number | null;
}
export default function LevelDisplay({ level }: LevelDisplayProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-4xl font-semibold">Level {level ? level : 0}</h1>
    </div>
  );
}
