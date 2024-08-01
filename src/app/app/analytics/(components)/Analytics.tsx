"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import getDailyGamesData, {
  DailyGamesData,
} from "@/database/queries/games/getDailyGamesData";
import AnalyticsFilters from "./AnalyticsFilters";
import { useEffect, useState } from "react";
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
  bulkData: DailyGamesData;
  userChildren: UserType[];
}

export default function Analytics({ bulkData, userChildren }: AnalyticsProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [chartMetric, setChartMetric] = useState<chartMetrics>(null);
  const [data, setData] = useState(bulkData);
  const [selectedChild, setSelectedChild] = useState<UserType | null>(null);

  const isParent = userChildren.length > 0;
  const cleanData =
    date && date.from && date.to && data.length > 0
      ? cleanChartData(data, date.from, date.to)
      : null;

  useEffect(() => {
    const getData = async () => {
      if (selectedChild) {
        const childData = await getDailyGamesData(selectedChild);
        setData(childData);
      }
    };

    getData();
  }, [selectedChild]);

  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader className="border-b p-8">
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
