import type { GamesData } from "@/types/analytics";
import { format, isEqual, startOfDay } from "date-fns";

export default function cleanChartData(
  data: GamesData,
  startDate: Date,
  endDate: Date,
): GamesData {
  const formattedData = data.map((item) => ({
    ...item,
    level: Math.round(item.level * 10) / 10,
    correctHits: Math.round(item.correctHits * 10) / 10,
    incorrectHits: Math.round(item.incorrectHits * 10) / 10,
    missedHits: Math.round(item.missedHits * 10) / 10,
    accuracy: Math.round(item.accuracy * 100),
    timePlayed: Math.round(item.timePlayed / 1000 / 60),
  }));

  if (data.length === 0) {
    return [];
  }

  const filledData = [];
  const firstEntry = data[0];
  if (!firstEntry) {
    return [];
  }

  for (
    let date = new Date(startDate);
    date < new Date(firstEntry.date);
    date.setDate(date.getDate() + 1)
  ) {
    filledData.push({
      userId: firstEntry.userId,
      level: 0,
      correctHits: 0,
      incorrectHits: 0,
      missedHits: 0,
      accuracy: 0,
      timePlayed: 0,
      gamesPlayed: 0,
      date: format(date, "yyyy-MM-dd"),
    });
  }

  let i = 0;
  for (
    let date = new Date(firstEntry.date);
    startOfDay(date) <= startOfDay(endDate);
    date.setDate(date.getDate() + 1)
  ) {
    const currentData = data[i];

    if (
      currentData &&
      isEqual(startOfDay(new Date(currentData.date)), startOfDay(date))
    ) {
      const formattedItem = formattedData[i];
      if (formattedItem) {
        filledData.push(formattedItem);
      }
      if (i + 1 < data.length) {
        i++;
      }
    } else if (!currentData) {
      filledData.push({
        userId: firstEntry.userId,
        level: 0,
        correctHits: 0,
        incorrectHits: 0,
        missedHits: 0,
        accuracy: 0,
        timePlayed: 0,
        gamesPlayed: 0,
        date: format(date, "yyyy-MM-dd"),
      });
    } else {
      const formattedItem = formattedData[i];
      if (formattedItem) {
        filledData.push({
          ...formattedItem,
          date: format(date, "yyyy-MM-dd"),
          timePlayed: 0,
          gamesPlayed: 0,
        });
      }
    }
  }

  const filteredData = filledData.filter((item) => {
    const date = new Date(item.date);
    return (
      startOfDay(date) >= startOfDay(startDate) &&
      startOfDay(date) <= startOfDay(endDate)
    );
  });

  return filteredData;
}
