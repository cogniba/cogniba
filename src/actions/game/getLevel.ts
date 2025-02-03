"use server";

import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import createClient from "@/lib/supabase/server";
import { desc, eq } from "drizzle-orm";

export default async function getLevel(): Promise<{
  level?: number;
  error?: string;
}> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: "Failed to get user" };
    }

    const level = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.userId, user.id))
      .orderBy(desc(gamesTable.createdAt))
      .limit(1)
      .then((res) => (res.length === 1 ? res[0].newLevel : 1));

    return { level };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}
