import { cn } from "@/lib/cn";

interface GameButtonProps {
  isButtonPressed: boolean;
  handleButtonPress: () => void;
}

export default function GameButton({
  isButtonPressed,
  handleButtonPress,
}: GameButtonProps) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      id="game-button"
    >
      <button
        className={cn(
          "pointer-events-auto h-full w-full -translate-y-0.5 rounded-md border border-orange-400/50 bg-orange-300 shadow-2xl outline-none transition duration-300 will-change-transform dark:border-orange-700 dark:bg-orange-800",
          isButtonPressed &&
            "translate-y-0.5 border-orange-500/50 bg-orange-400 shadow-sm dark:border-orange-600 dark:bg-orange-700",
        )}
        tabIndex={-1}
        onPointerDown={handleButtonPress}
      ></button>
    </div>
  );
}
