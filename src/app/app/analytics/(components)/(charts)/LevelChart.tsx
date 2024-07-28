import AnalyticsChart from "../AnalyticsChart";
import { ChartConfig } from "@/components/ui/chart";
import { DailyGamesData } from "@/database/queries/games/getDailyGamesData";

const chartConfig = {
  level: {
    label: "Level",
    color: "var(--orange-500)",
  },
} satisfies ChartConfig;

interface LevelChartProps {
  data: DailyGamesData;
}

export default function LevelChart({ data }: LevelChartProps) {
  return (
    <AnalyticsChart
      data={data}
      chartConfig={chartConfig}
      title="Average level"
      description="Showing the average level per day"
      names={["level"]}
    />
  );
}
