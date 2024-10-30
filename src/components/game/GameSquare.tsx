import { cn } from "@/lib/cn";

interface SquareProps {
  selected: boolean;
}

export default function Square({ selected }: SquareProps) {
  return (
    <div className="h-full w-full">
      <div
        className={cn(
          "h-full w-full rounded-[2cqmin] border border-blue-400/50 bg-blue-300 shadow-sm transition duration-100 dark:border-blue-400 dark:bg-blue-500",
          selected &&
            "border-blue-700/50 bg-blue-600 shadow-lg dark:border-blue-100/50 dark:bg-blue-200",
        )}
      ></div>
    </div>
  );
}
