import { twMerge } from "tailwind-merge";

interface SquareProps {
  selected: boolean;
}

export default function Square({ selected }: SquareProps) {
  return (
    <div className="h-full w-full">
      <div
        className={twMerge(
          "h-full w-full rounded-[2cqmin] border border-teal-400/50 bg-teal-300 shadow-sm transition duration-100",
          selected ? "border-teal-700/50 bg-teal-600 shadow-lg" : "",
        )}
      ></div>
    </div>
  );
}