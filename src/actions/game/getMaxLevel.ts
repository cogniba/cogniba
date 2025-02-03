"use server";

import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import createClient from "@/lib/supabase/server";
import { desc, eq } from "drizzle-orm";

export default async function getMaxLevel(): Promise<{
  maxLevel?: number;
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

    const maxLevel = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.userId, user.id))
      .orderBy(desc(gamesTable.newLevel))
      .limit(1)
      .then((res) => (res.length === 1 ? res[0].newLevel : 1));

    return { maxLevel };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}
