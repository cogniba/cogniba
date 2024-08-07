"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DailyGamesData } from "@/database/queries/games/getUserDailyGamesData";
import AnalyticsFilters from "./AnalyticsFilters";
import { useState } from "react";
import cleanChartData from "@/lib/cleanChartData";
import { UserType } from "@/database/schemas/auth";
import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import AnalyticsMetrics from "./AnalyticsMetricCharts";

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
    <Card className="flex h-full w-full flex-col bg-white pb-4 pt-8 dark:bg-slate-900/30 xs:py-0">
      <CardHeader className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-8">
        <AnalyticsFilters
          userChildren={userChildren}
          date={date}
          setDate={setDate}
          chartMetric={chartMetric}
          setChartMetric={setChartMetric}
          selectedChild={selectedChild}
          setSelectedChild={setSelectedChild}
        />
      </CardHeader>
      <CardContent className="flex h-full flex-col p-5 sm:p-8">
        <AnalyticsMetrics
          isParent={isParent}
          selectedChild={selectedChild}
          chartMetric={chartMetric}
          cleanData={cleanData}
        />
      </CardContent>
    </Card>
  );
}
