"use client";

import getDailyGamesData, {
  DailyGamesData,
} from "@/database/queries/getDailyGamesData";
import { useEffect, useState } from "react";
import LevelChart from "./(components)/LevelChart";
import getUserByUsername from "@/database/queries/getUserByUsername";

export default function AnalyticsPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState<DailyGamesData>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getDailyGamesData();
      setData(data);
    };
    getData();
  }, []);

  const currentDate = new Date();
  const fiveDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 10));

  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-full w-full max-w-7xl">
        <LevelChart
          data={data}
          // startDate={startDate}
          startDate={fiveDaysAgo}
          endDate={endDate}
        />
      </div>
    </div>
  );
}
