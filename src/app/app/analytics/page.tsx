import { GamesData } from "@/app/api/game/get-data/route";
import Analytics from "./(components)/Analytics";
import { createClient } from "@/lib/supabase/server";
import { avg, count, eq, sql, SQL, sum } from "drizzle-orm";
import { gamesTable } from "@/database/schemas/gamesTable";
import { db } from "@/database/db";
import calculateAccuracy from "@/lib/calculateAccuracy";

type FrequencyType = "daily" | "weekly" | "monthly";

export default async function AnalyticsPage() {
  const frequency: FrequencyType = "daily";

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return <div>Error getting user</div>;
  }

  const userId = data.user.id;

  let dateGroupingFunction: SQL<unknown>;
  if (frequency === "daily") {
    dateGroupingFunction = sql`DATE(${gamesTable.createdAt})`;
  } else if (frequency === "weekly") {
    dateGroupingFunction = sql`EXTRACT(WEEK FROM ${gamesTable.createdAt})`;
  } else if (frequency === "monthly") {
    dateGroupingFunction = sql`EXTRACT(MONTH FROM ${gamesTable.createdAt})`;
  } else {
    return;
  }

  const rawData = await db
    .select({
      userId: gamesTable.userId,
      gamesPlayed: count(gamesTable.level),
      level: avg(gamesTable.level).mapWith(Number),
      correctHits: avg(gamesTable.correctHits).mapWith(Number),
      incorrectHits: avg(gamesTable.incorrectHits).mapWith(Number),
      missedHits: avg(gamesTable.missedHits).mapWith(Number),
      timePlayed: sum(gamesTable.timePlayed).mapWith(Number),
      date: dateGroupingFunction,
    })
    .from(gamesTable)
    .where(eq(gamesTable.userId, userId))
    .groupBy(dateGroupingFunction, gamesTable.userId)
    .orderBy(dateGroupingFunction);

  const processedData: GamesData = rawData.map((data) => ({
    ...data,
    accuracy: calculateAccuracy({
      correctHits: data.correctHits,
      incorrectHits: data.incorrectHits,
      missedHits: data.missedHits,
    }),
    date: data.date as string,
  }));

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="sm:mx-10 flex h-full w-full max-w-7xl flex-col items-center gap-5 xs:mx-6 xs:py-10">
        <Analytics data={processedData} />
      </div>
    </div>
  );
}
