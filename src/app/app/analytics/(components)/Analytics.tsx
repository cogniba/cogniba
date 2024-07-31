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

export type chartMetrics =
  | "level"
  | "accuracy"
  | "stats"
  | "gamesPlayed"
  | "timePlayed";

interface AnalyticsProps {
  bulkData: DailyGamesData;
  userChildren: UserType[];
}

export default function Analytics({ bulkData, userChildren }: AnalyticsProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [chartMetric, setChartMetric] = useState<chartMetrics>("level");
  const [data, setData] = useState(bulkData);
  const [selectedChild, setSelectedChild] = useState<UserType | null>(null);

  const cleanData =
    date && date.from && date.to
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
      <CardHeader>
        <AnalyticsFilters
          userChildren={userChildren}
          date={date}
          setDate={setDate}
          setChartMetric={setChartMetric}
          selectedChild={selectedChild}
          setSelectedChild={setSelectedChild}
        />
      </CardHeader>
      <CardContent className="h-full">
        {chartMetric === "level" && <LevelChart data={cleanData} />}
        {chartMetric === "accuracy" && <AccuracyChart data={cleanData} />}
        {chartMetric === "stats" && <StatsChart data={cleanData} />}
        {chartMetric === "gamesPlayed" && <GamesPlayedChart data={cleanData} />}
        {chartMetric === "timePlayed" && <TimePlayedChart data={cleanData} />}
      </CardContent>
    </Card>
  );
}
