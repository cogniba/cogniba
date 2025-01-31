import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import createClient from "@/lib/supabase/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export default async function getLevelRequest(): Promise<NextResponse> {
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

    const level = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.userId, userId))
      .orderBy(desc(gamesTable.createdAt))
      .limit(1)
      .then((res) => (res.length === 1 ? res[0].newLevel : 1));

    return NextResponse.json({ level }, { status: 200 });
  } catch (error) {
    console.error("Error getting level:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
