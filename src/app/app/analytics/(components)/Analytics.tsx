"use client";

import AnalyticsFilters from "./AnalyticsFilters";
import cleanChartData from "@/lib/cleanChartData";
import AnalyticsMetrics from "./AnalyticsMetricCharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { subDays } from "date-fns";

import type { DateRange } from "react-day-picker";
import { GamesData } from "@/app/api/game/get-data/route";

export type chartMetrics =
  | "level"
  | "accuracy"
  | "stats"
  | "gamesPlayed"
  | "timePlayed"
  | null;

interface AnalyticsProps {
  data: GamesData;
}

export default function Analytics({ data }: AnalyticsProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [chartMetric, setChartMetric] = useState<chartMetrics>(null);

  const cleanData =
    date && date.from && date.to && data && data.length > 0
      ? cleanChartData(data, date.from, date.to)
      : null;

  return (
    <Card className="flex h-full w-full flex-col bg-white pb-4 pt-8 dark:bg-slate-900/30 xs:py-0">
      <CardHeader className="sm:p-8 border-b border-slate-200 p-5 dark:border-slate-800">
        <AnalyticsFilters
          date={date}
          setDate={setDate}
          chartMetric={chartMetric}
          setChartMetric={setChartMetric}
        />
      </CardHeader>
      <CardContent className="sm:p-8 flex h-full flex-col p-5">
        <AnalyticsMetrics chartMetric={chartMetric} data={cleanData} />
      </CardContent>
    </Card>
  );
}
