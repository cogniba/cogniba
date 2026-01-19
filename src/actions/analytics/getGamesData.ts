"use server";

import type { AnalyticsFrequencySchemaType } from "@/zod/schemas/AnalyticsFrequencySchema";
import { AnalyticsFrequencySchema } from "@/zod/schemas/AnalyticsFrequencySchema";
import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import calculateAccuracy from "@/lib/game/game-logic/calculateAccuracy";
import getUserOrError from "@/lib/auth/getUserOrError";
import { err, ok, type Result } from "@/lib/result";
import type { GamesData } from "@/types/analytics";
import type { SQL } from "drizzle-orm";
import { avg, count, eq, sql, sum } from "drizzle-orm";

export default async function getGamesData(
  input: AnalyticsFrequencySchemaType,
): Promise<Result<GamesData>> {
  const parsed = AnalyticsFrequencySchema.safeParse(input);
  if (!parsed.success) {
    return err("Invalid frequency value");
  }

  const userResult = await getUserOrError();
  if (userResult.error) {
    return err(userResult.error);
  }

  const { data: user } = userResult;
  if (!user) {
    return err("Failed to get user");
  }

  try {
    let dateGroupingFunction: SQL;
    if (parsed.data.frequency === "daily") {
      dateGroupingFunction = sql`DATE(${gamesTable.createdAt})`;
    } else if (parsed.data.frequency === "weekly") {
      dateGroupingFunction = sql`EXTRACT(WEEK FROM ${gamesTable.createdAt})`;
    } else {
      dateGroupingFunction = sql`EXTRACT(MONTH FROM ${gamesTable.createdAt})`;
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
      .where(eq(gamesTable.userId, user.id))
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

    return ok(processedData);
  } catch (error) {
    console.error(error);
    return err("An unexpected error occurred");
  }
}
