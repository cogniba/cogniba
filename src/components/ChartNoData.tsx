import { FileSearchIcon } from "lucide-react";

interface ChartNoDataProps {
  text: string;
}

export default function ChartNoData({ text }: ChartNoDataProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 pb-20">
      <FileSearchIcon
        className="h-12 w-12 text-muted-foreground"
        strokeWidth={1.2}
      />
      <div className="text-2xl text-muted-foreground">{text}</div>
    </div>
  );
}
