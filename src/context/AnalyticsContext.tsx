"use client";

import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { subDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import cleanChartData from "@/lib/cleanChartData";
import type { ChartConfig } from "@/components/ui/chart";
import type { ChartsConfig, GamesData } from "@/types/analytics";

const charts = {
  level: {
    title: "Average level",
    description: "Showing the average level per day",
    names: ["level"],
    chartConfig: {
      level: {
        label: "Level",
        color: "rgb(var(--primary))",
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
        color: "rgb(var(--primary))",
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
        color: "rgb(var(--green))",
      },
      incorrectHits: {
        label: "Incorrect",
        color: "rgb(var(--red))",
      },
      missedHits: {
        label: "Missed",
        color: "rgb(var(--yellow))",
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
        color: "rgb(var(--primary))",
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
        color: "rgb(var(--primary))",
      },
    } satisfies ChartConfig,
  },
} satisfies ChartsConfig;

export const chartMetrics = [
  "level",
  "accuracy",
  "stats",
  "gamesPlayed",
  "timePlayed",
] as const;

export type ChartMetrics = (typeof chartMetrics)[number];

type AnalyticsContextValue = {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  chartMetric: ChartMetrics;
  setChartMetric: Dispatch<SetStateAction<ChartMetrics>>;
  cleanData: GamesData | null;
  charts: ChartsConfig;
};

const noop = () => {
  return;
};

export const AnalyticsContext = createContext<AnalyticsContextValue>({
  date: undefined,
  setDate: noop,
  chartMetric: "level",
  setChartMetric: noop,
  cleanData: null,
  charts,
});

type AnalyticsContextProviderProps = {
  children: React.ReactNode;
  data: GamesData;
};

export default function AnalyticsContextProvider({
  children,
  data,
}: AnalyticsContextProviderProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [chartMetric, setChartMetric] = useState<ChartMetrics>("level");

  const cleanData =
    date?.from && date.to && data.length > 0
      ? cleanChartData(data, date.from, date.to)
      : null;

  return (
    <AnalyticsContext.Provider
      value={{
        date,
        setDate,
        chartMetric,
        setChartMetric,
        cleanData,
        charts,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  return useContext(AnalyticsContext);
}
