import getDailyGamesData from "@/database/queries/games/getDailyGamesData";
import Analytics from "./(components)/Analytics";
import getUserChildren from "@/database/queries/users/getUserChildren";

export default async function AnalyticsPage() {
  const data = await getDailyGamesData();
  const children = await getUserChildren();

  return (
    <div className="flex h-full items-center justify-center pl-16">
      <div className="flex h-full w-full max-w-7xl flex-col items-center gap-5 py-20">
        <Analytics bulkData={data} userChildren={children} />
      </div>
    </div>
  );
}
