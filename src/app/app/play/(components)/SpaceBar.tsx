import { cn } from "@/lib/cn";

interface SpaceBarProps {
  isSpaceBarPressed: boolean;
  handleSpaceBarPress: () => void;
}

export default function SpaceBar({
  isSpaceBarPressed,
  handleSpaceBarPress,
}: SpaceBarProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        className={cn(
          "h-full w-full -translate-y-1 rounded-md border border-orange-400/50 bg-orange-300 shadow-2xl outline-none transition duration-300 dark:border-orange-700 dark:bg-orange-800",
          isSpaceBarPressed &&
            "translate-y-0 border-orange-500/50 bg-orange-400 shadow-sm dark:border-orange-600 dark:bg-orange-700",
        )}
        id="button"
        tabIndex={-1}
        onPointerDown={handleSpaceBarPress}
      ></button>
    </div>
  );
}
