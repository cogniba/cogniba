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
    <div className="flex h-full w-full items-center justify-center" id="button">
      <button
        className={cn(
          "h-full w-full -translate-y-1 rounded-md border border-orange-400/50 bg-orange-300 shadow-2xl outline-none transition duration-300 dark:border-orange-700 dark:bg-orange-800",
          isButtonPressed &&
            "translate-y-0 border-orange-500/50 bg-orange-400 shadow-sm dark:border-orange-600 dark:bg-orange-700",
        )}
        tabIndex={-1}
        onPointerDown={handleButtonPress}
      ></button>
    </div>
  );
}
