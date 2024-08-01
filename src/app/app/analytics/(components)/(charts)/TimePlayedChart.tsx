import AnalyticsChart from "../AnalyticsChart";
import { ChartConfig } from "@/components/ui/chart";
import { DailyGamesData } from "@/database/queries/games/getDailyGamesData";

const chartConfig = {
  timePlayed: {
    label: "Time Played",
    color: "var(--orange-500)",
  },
} satisfies ChartConfig;

interface TimePlayedChartProps {
  data: DailyGamesData | null;
}

export default function TimePlayedChart({ data }: TimePlayedChartProps) {
  return (
    <AnalyticsChart
      data={data}
      chartConfig={chartConfig}
      title="Time played"
      description="Showing the time played per day"
      names={["timePlayed"]}
      postfix=" min"
    />
  );
}
