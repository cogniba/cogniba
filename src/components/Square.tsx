import { twMerge } from "tailwind-merge";

interface SquareProps {
  selected: boolean;
}

export default function Square({ selected }: SquareProps) {
  return (
    <div
      className={twMerge(
        "h-full w-full rounded-sm bg-white",
        selected ? "bg-slate-300" : "",
      )}
    ></div>
  );
}
