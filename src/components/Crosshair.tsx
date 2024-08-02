export default function Crosshair() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-[1cqmin] w-[5cqmin] rounded-full bg-orange-300 dark:bg-orange-800"></div>
      <div className="absolute h-[1cqmin] w-[5cqmin] rotate-90 rounded-full bg-orange-300 dark:bg-orange-800"></div>
    </div>
  );
}
