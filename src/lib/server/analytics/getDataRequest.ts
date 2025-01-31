import { GamesData } from "@/app/api/analytics/get-data/route";
import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import calculateAccuracy from "@/lib/calculateAccuracy";
import createClient from "@/lib/supabase/server";
import { avg, count, eq, sql, SQL, sum } from "drizzle-orm";
import { NextResponse } from "next/server";

interface GetDataParams {
  frequency: "daily" | "weekly" | "monthly";
}

export default async function getDataRequest({
  frequency,
}: GetDataParams): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 400 },
      );
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
      throw new Error("Invalid frequency value");
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

    return NextResponse.json({ data: processedData }, { status: 200 });
  } catch (error) {
    console.error("Error getting data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
