"use server";

import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import getUserOrError from "@/lib/auth/getUserOrError";
import { err, ok, type Result } from "@/lib/result";
import { desc, eq } from "drizzle-orm";

export default async function getMaxLevel(): Promise<Result<number>> {
  const userResult = await getUserOrError();
  if (userResult.error) {
    return err(userResult.error);
  }

  const { data: user } = userResult;
  if (!user) {
    return err("Failed to get user");
  }

  try {
    const level = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.userId, user.id))
      .orderBy(desc(gamesTable.newLevel))
      .limit(1)
      .then((res) => res[0]?.newLevel ?? 1);

    return ok(level);
  } catch (error) {
    console.error(error);
    return err("An unexpected error occurred");
  }
}
