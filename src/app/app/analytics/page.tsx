"use client";

import getDailyGamesData, {
  DailyGamesData,
} from "@/database/queries/getDailyGamesData";
import { useEffect, useState } from "react";
import LevelChart from "./(components)/(charts)/LevelChart";
import AccuracyChart from "./(components)/(charts)/AccuracyChart";
import StatsChart from "./(components)/(charts)/StatsChart";
import GamesPlayedChart from "./(components)/(charts)/GamesPlayedChart";
import TimePlayedChart from "./(components)/(charts)/TimePlayedChart";

export default function AnalyticsPage() {
  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 10)),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState<DailyGamesData>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getDailyGamesData();
      setData(data);
    };
    getData();
  }, []);

  const formattedData = data.map((item) => ({
    ...item,
    level: Math.round(item.level * 10) / 10,
    correctHits: Math.round(item.correctHits * 10) / 10,
    incorrectHits: Math.round(item.incorrectHits * 10) / 10,
    missedHits: Math.round(item.missedHits * 10) / 10,
    timePlayed: Math.round(item.timePlayed / 1000 / 60),
    accuracy:
      Math.round(
        (item.correctHits /
          (item.correctHits + item.incorrectHits + item.missedHits)) *
          100,
      ) / 100,
  }));

  const filteredData = formattedData.filter(
    (item) =>
      new Date(item.date) >= startDate && new Date(item.date) <= endDate,
  );

  return (
    <div className="flex h-full items-center justify-center pl-16">
      <div className="flex h-full w-full max-w-7xl flex-col items-center gap-5 py-10">
        <LevelChart data={filteredData} />
        <AccuracyChart data={filteredData} />
        <GamesPlayedChart data={filteredData} />
        <TimePlayedChart data={filteredData} />
        <StatsChart data={filteredData} />
      </div>
    </div>
  );
}
