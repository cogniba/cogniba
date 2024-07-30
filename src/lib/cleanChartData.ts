import { DailyGamesData } from "@/database/queries/games/getDailyGamesData";
import { format } from "date-fns";

export default function cleanChartData(
  data: DailyGamesData,
  startDate: Date,
  endDate: Date,
): DailyGamesData {
  const filteredData = data.filter((item) => {
    const date = new Date(item.date);
    return date >= startDate && date <= endDate;
  });

  const formattedData = filteredData.map((item) => ({
    ...item,
    level: Math.round(item.level * 10) / 10,
    correctHits: Math.round(item.correctHits * 10) / 10,
    incorrectHits: Math.round(item.incorrectHits * 10) / 10,
    missedHits: Math.round(item.missedHits * 10) / 10,
    accuracy: Math.round(
      (item.correctHits /
        (item.correctHits + item.incorrectHits + item.missedHits)) *
        100,
    ),
    timePlayed: Math.round(item.timePlayed / 1000 / 60),
  }));

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (
      !formattedData.find((item) => item.date === format(date, "yyyy-MM-dd"))
    ) {
      formattedData.push({
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
  }

  return formattedData.sort((a, b) => a.date.localeCompare(b.date));
}
