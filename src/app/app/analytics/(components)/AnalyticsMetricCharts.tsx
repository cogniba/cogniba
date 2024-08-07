import ChartNoData from "@/components/ChartNoData";
import { UserType } from "@/database/schemas/auth";
import { chartMetrics } from "./Analytics";
import { DailyGamesData } from "@/database/queries/games/getUserDailyGamesData";
import AnalyticsChart from "./AnalyticsChart";
import { ChartConfig } from "@/components/ui/chart";

const charts = {
  level: {
    title: "Average level",
    description: "Showing the average level per day",
    names: ["level"],
    chartConfig: {
      level: {
        label: "Level",
        color: "var(--orange-500)",
      },
    } satisfies ChartConfig,
  },

  accuracy: {
    title: "Accuracy",
    description: "Showing the average accuracy per day",
    names: ["accuracy"],
    postfix: "%",
    chartConfig: {
      accuracy: {
        label: "Accuracy",
        color: "var(--orange-500)",
      },
    } satisfies ChartConfig,
  },

  stats: {
    title: "Stats",
    description: "Showing the average stats per day",
    names: ["correctHits", "incorrectHits", "missedHits"],
    chartConfig: {
      correctHits: {
        label: "Correct",
        color: "var(--green-500)",
      },
      incorrectHits: {
        label: "Incorrect",
        color: "var(--red-500)",
      },
      missedHits: {
        label: "Missed",
        color: "var(--yellow-500)",
      },
    } satisfies ChartConfig,
  },

  gamesPlayed: {
    title: "Games played",
    description: "Showing the number of games played per day",
    names: ["gamesPlayed"],
    chartConfig: {
      gamesPlayed: {
        label: "Games Played",
        color: "var(--orange-500)",
      },
    } satisfies ChartConfig,
  },

  timePlayed: {
    title: "Time played",
    description: "Showing the time played per day",
    names: ["timePlayed"],
    postfix: " min",
    chartConfig: {
      timePlayed: {
        label: "Time Played",
        color: "var(--orange-500)",
      },
    } satisfies ChartConfig,
  },
};

interface AnalyticsMetricsProps {
  isParent: boolean;
  selectedChild: UserType | null;
  chartMetric: chartMetrics;
  cleanData: DailyGamesData | null;
}

export default function AnalyticsMetrics({
  isParent,
  selectedChild,
  chartMetric,
  cleanData,
}: AnalyticsMetricsProps) {
  return (
    <>
      {isParent && selectedChild === null ? (
        <ChartNoData text="No child selected" />
      ) : chartMetric === null ? (
        <ChartNoData text="No metric selected" />
      ) : (
        <AnalyticsChart data={cleanData} {...charts[chartMetric]} />
      )}
    </>
  );
}
