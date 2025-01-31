import { db } from "@/database/db";
import { gamesTable } from "@/database/schemas/gamesTable";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (typeof body.level !== "number") {
      return NextResponse.json(
        { error: "Invalid level value" },
        { status: 400 },
      );
    } else if (typeof body.newLevel !== "number") {
      return NextResponse.json(
        { error: "Invalid newLevel value" },
        { status: 400 },
      );
    } else if (typeof body.correctHits !== "number") {
      return NextResponse.json(
        { error: "Invalid correctHits value" },
        { status: 400 },
      );
    } else if (typeof body.incorrectHits !== "number") {
      return NextResponse.json(
        { error: "Invalid missedHits value" },
        { status: 400 },
      );
    } else if (typeof body.missedHits !== "number") {
      return NextResponse.json(
        { error: "Invalid missedHits value" },
        { status: 400 },
      );
    } else if (typeof body.timePlayed !== "number") {
      return NextResponse.json(
        { error: "Invalid timePlayed value" },
        { status: 400 },
      );
    }

    const {
      level,
      newLevel,
      correctHits,
      incorrectHits,
      missedHits,
      timePlayed,
    } = body;

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 400 },
      );
    }

    const userId = data.user.id;

    await db.insert(gamesTable).values({
      level,
      newLevel,
      correctHits,
      incorrectHits,
      missedHits,
      timePlayed,
      userId,
    });

    revalidatePath("/app/play");
    revalidatePath("/app/analytics");

    return NextResponse.json(
      { message: "Game inserted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error inserting game:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
