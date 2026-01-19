"use server";

import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import getUserOrError from "@/lib/auth/getUserOrError";
import { err, ok, type Result } from "@/lib/result";
import { and, eq, gte, sql } from "drizzle-orm";

export default async function getGamesPlayedToday(): Promise<Result<number>> {
  const userResult = await getUserOrError();
  if (userResult.error) {
    return err(userResult.error);
  }

  const { data: user } = userResult;
  if (!user) {
    return err("Failed to get user");
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(gamesTable)
      .where(
        and(eq(gamesTable.userId, user.id), gte(gamesTable.createdAt, today)),
      );

    const [row] = result;
    return ok(row?.count ?? 0);
  } catch (error) {
    console.error(error);
    return err("An unexpected error occurred");
  }
}
