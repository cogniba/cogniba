import getDailyGamesData from "@/database/queries/getDailyGamesData";

export default async function AnalyticsPage() {
  const currentDate = new Date();
  const fiveDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 5));
  const data = await getDailyGamesData(fiveDaysAgo, new Date());

  return (
    <pre className="flex items-center justify-center">
      {JSON.stringify(data, null, "  ")}
    </pre>
  );
}
