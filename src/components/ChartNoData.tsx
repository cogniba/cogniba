import { FileSearchIcon } from "lucide-react";

type ChartNoDataProps = {
  text: string;
};

export default function ChartNoData({ text }: ChartNoDataProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 pb-20">
      <FileSearchIcon
        className="text-muted-foreground h-12 w-12"
        strokeWidth={1.2}
      />
      <div className="text-muted-foreground text-2xl">{text}</div>
    </div>
  );
}
