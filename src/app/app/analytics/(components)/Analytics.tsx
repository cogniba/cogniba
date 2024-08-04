"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DailyGamesData } from "@/database/queries/games/getUserDailyGamesData";
import AnalyticsFilters from "./AnalyticsFilters";
import { useState } from "react";
import LevelChart from "./(charts)/LevelChart";
import AccuracyChart from "./(charts)/AccuracyChart";
import GamesPlayedChart from "./(charts)/GamesPlayedChart";
import StatsChart from "./(charts)/StatsChart";
import TimePlayedChart from "./(charts)/TimePlayedChart";
import cleanChartData from "@/lib/cleanChartData";
import { UserType } from "@/database/schemas/auth";
import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import ChartNoData from "@/components/ChartNoData";

export type chartMetrics =
  | "level"
  | "accuracy"
  | "stats"
  | "gamesPlayed"
  | "timePlayed"
  | null;

interface AnalyticsProps {
  userData: DailyGamesData | null;
  childrenData: DailyGamesData[] | null;
  userChildren: UserType[];
}

export default function Analytics({
  userData,
  childrenData,
  userChildren,
}: AnalyticsProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [chartMetric, setChartMetric] = useState<chartMetrics>(null);
  const [selectedChild, setSelectedChild] = useState<UserType | null>(null);

  const selectedChildIndex = userChildren.findIndex(
    (child) => child.id === selectedChild?.id,
  );

  const isParent = userChildren.length > 0;
  const validData = isParent ? childrenData?.[selectedChildIndex] : userData;

  const cleanData =
    date && date.from && date.to && validData && validData.length > 0
      ? cleanChartData(validData, date.from, date.to)
      : null;

  return (
    <Card className="flex h-full w-full flex-col bg-white dark:bg-slate-900/30">
      <CardHeader className="border-b border-slate-200 p-8 dark:border-slate-800">
        <AnalyticsFilters
          userChildren={userChildren}
          date={date}
          setDate={setDate}
          setChartMetric={setChartMetric}
          selectedChild={selectedChild}
          setSelectedChild={setSelectedChild}
        />
      </CardHeader>
      <CardContent className="flex h-full flex-col p-8">
        {isParent && selectedChild === null ? (
          <ChartNoData text="No child selected" />
        ) : (
          <>
            {chartMetric === null && <ChartNoData text="No metric selected" />}
            {chartMetric === "level" && <LevelChart data={cleanData} />}
            {chartMetric === "accuracy" && <AccuracyChart data={cleanData} />}
            {chartMetric === "stats" && <StatsChart data={cleanData} />}
            {chartMetric === "gamesPlayed" && (
              <GamesPlayedChart data={cleanData} />
            )}
            {chartMetric === "timePlayed" && (
              <TimePlayedChart data={cleanData} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
