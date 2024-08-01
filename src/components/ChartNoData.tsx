import { FileSearchIcon } from "lucide-react";

interface ChartNoDataProps {
  text: string;
}

export default function ChartNoData({ text }: ChartNoDataProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 pb-24 text-slate-400">
      <FileSearchIcon
        className="h-12 w-12 text-slate-800"
        strokeWidth={1.2}
        opacity={0.5}
      />
      <div className="text-2xl text-slate-800/50">{text}</div>
    </div>
  );
}
