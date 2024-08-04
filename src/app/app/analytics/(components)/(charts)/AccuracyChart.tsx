import AnalyticsChart from "../AnalyticsChart";
import { ChartConfig } from "@/components/ui/chart";
import { DailyGamesData } from "@/database/queries/games/getUserDailyGamesData";

const chartConfig = {
  accuracy: {
    label: "Accuracy",
    color: "var(--orange-500)",
  },
} satisfies ChartConfig;

interface AccuracyChartProps {
  data: DailyGamesData | null;
}

export default function AccuracyChart({ data }: AccuracyChartProps) {
  return (
    <AnalyticsChart
      data={data}
      chartConfig={chartConfig}
      title="Average accuracy"
      description="Showing the average accuracy per day"
      names={["accuracy"]}
      postfix="%"
    />
  );
}
