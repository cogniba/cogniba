"use server";

import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import createClient from "@/lib/supabase/server";
import { and, eq, gte, sql } from "drizzle-orm";

export default async function getGamesPlayedToday(): Promise<{
  gamesPlayedToday?: number;
  error?: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Failed to get user" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(gamesTable)
    .where(
      and(eq(gamesTable.userId, user.id), gte(gamesTable.createdAt, today)),
    );

  return { gamesPlayedToday: Number(result[0].count) };
}
