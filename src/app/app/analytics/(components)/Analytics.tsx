"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DailyGamesData } from "@/database/queries/games/getDailyGamesData";
import AnalyticsFilters from "./AnalyticsFilters";
import { useEffect, useState } from "react";
import LevelChart from "./(charts)/LevelChart";
import AccuracyChart from "./(charts)/AccuracyChart";
import GamesPlayedChart from "./(charts)/GamesPlayedChart";
import StatsChart from "./(charts)/StatsChart";
import TimePlayedChart from "./(charts)/TimePlayedChart";
import cleanChartData from "@/lib/cleanChartData";
import { UserType } from "@/database/schemas/auth";

type chartMetrics =
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
  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 20)),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [chartMetric, setChartMetric] = useState<chartMetrics>("level");
  const [data, setData] = useState(bulkData);

  useEffect(() => {
    const cleanData = cleanChartData(bulkData, startDate, endDate);
    setData(cleanData);
  }, [startDate, endDate, bulkData]);

  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader>
        <AnalyticsFilters userChildren={userChildren} />
      </CardHeader>
      <CardContent className="h-full">
        {chartMetric === "level" && <LevelChart data={data} />}
        {chartMetric === "accuracy" && <AccuracyChart data={data} />}
        {chartMetric === "stats" && <StatsChart data={data} />}
        {chartMetric === "gamesPlayed" && <GamesPlayedChart data={data} />}
        {chartMetric === "timePlayed" && <TimePlayedChart data={data} />}
      </CardContent>
    </Card>
  );
}
