"use server";

import { avg, count, eq, sum } from "drizzle-orm";
import { db } from "@/database/db";
import { games } from "@/database/schemas/games";
import getUser from "./getUser";
import { date } from "./functions";
import { users } from "../schemas/auth";

export type DailyGamesData = {
  gamesPlayed: number;
  level: number;
  correctHits: number;
  incorrectHits: number;
  missedHits: number;
  timeSpent: number;
  date: string;
}[];

export default async function getDailyGamesData(): Promise<DailyGamesData> {
  const { id: userId } = await getUser();

  if (!userId) {
    throw new Error("User not found");
  }

  const gamesData = await db
    .select({
      gamesPlayed: count(games.level),
      level: avg(games.level).mapWith(Number),
      correctHits: avg(games.correctHits).mapWith(Number),
      incorrectHits: avg(games.incorrectHits).mapWith(Number),
      missedHits: avg(games.missedHits).mapWith(Number),
      timeSpent: sum(games.timeSpent).mapWith(Number),
      date: date(games.createdAt),
    })
    .from(games)
    .where(eq(games.userId, userId))
    .groupBy(date(games.createdAt))
    .orderBy(date(games.createdAt));

  return gamesData;
}
