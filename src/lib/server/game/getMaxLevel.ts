import { db } from "@/database/db";
import { gamesTable } from "@/database/schemas/gamesTable";
import { createClient } from "@/lib/supabase/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export default async function getMaxLevel(): Promise<NextResponse> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 400 },
      );
    }

    const userId = data.user.id;

    const level = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.userId, userId))
      .orderBy(desc(gamesTable.newLevel))
      .limit(1)
      .then((res) => (res.length === 1 ? res[0].newLevel : 1));

    return NextResponse.json({ maxLevel: level }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
