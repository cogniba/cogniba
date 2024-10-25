import { db } from "@/database/db";
import { gamesTable } from "@/database/schemas/gamesTable";
import calculateAccuracy from "@/lib/calculateAccuracy";
import { createClient } from "@/lib/supabase/server";
import { avg, count, eq, SQL, sql, sum } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export type GamesData = {
  userId: string;
  gamesPlayed: number;
  level: number;
  correctHits: number;
  incorrectHits: number;
  missedHits: number;
  accuracy: number;
  timePlayed: number;
  date: string;
}[];

const validFrequencies = ["daily", "weekly", "monthly"];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const frequency = searchParams.get("frequency");

  if (typeof frequency !== "string" || !validFrequencies.includes(frequency)) {
    return NextResponse.json(
      { error: "Invalid frequency value" },
      { status: 400 },
    );
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return NextResponse.json(
      { error: "Failed to get session" },
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

  return NextResponse.json({ data: processedData }, { status: 200 });
}
