import AnalyticsChart from "../AnalyticsChart";
import { ChartConfig } from "@/components/ui/chart";
import { DailyGamesData } from "@/database/queries/games/getUserDailyGamesData";

const chartConfig = {
  gamesPlayed: {
    label: "Games Played",
    color: "var(--orange-500)",
  },
} satisfies ChartConfig;

interface GamesPlayedChartProps {
  data: DailyGamesData | null;
}

export default function GamesPlayedChart({ data }: GamesPlayedChartProps) {
  return (
    <AnalyticsChart
      data={data}
      chartConfig={chartConfig}
      title="Games played"
      description="Showing number of games played per day"
      names={["gamesPlayed"]}
    />
  );
}
