import type { GamesData } from "@/app/api/analytics/get-data/route";
import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import calculateAccuracy from "@/lib/game/game-logic/calculateAccuracy";
import createClient from "@/lib/supabase/server";
import type { SQL } from "drizzle-orm";
import { avg, count, eq, sql, sum } from "drizzle-orm";
import { NextResponse } from "next/server";

type GetDataParams = {
  frequency: "daily" | "weekly" | "monthly";
};

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

    let dateGroupingFunction: SQL;
    switch (frequency) {
      case "daily":
        dateGroupingFunction = sql`DATE(${gamesTable.createdAt})`;
        break;
      case "weekly":
        dateGroupingFunction = sql`EXTRACT(WEEK FROM ${gamesTable.createdAt})`;
        break;
      case "monthly":
        dateGroupingFunction = sql`EXTRACT(MONTH FROM ${gamesTable.createdAt})`;
        break;
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
