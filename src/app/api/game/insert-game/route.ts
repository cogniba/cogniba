import { db } from "@/database";
import { gamesTable } from "@/database/schemas/gamesTable";
import createClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;

    if (typeof payload["level"] !== "number") {
      return NextResponse.json(
        { error: "Invalid level value" },
        { status: 400 },
      );
    } else if (typeof payload["newLevel"] !== "number") {
      return NextResponse.json(
        { error: "Invalid newLevel value" },
        { status: 400 },
      );
    } else if (typeof payload["correctHits"] !== "number") {
      return NextResponse.json(
        { error: "Invalid correctHits value" },
        { status: 400 },
      );
    } else if (typeof payload["incorrectHits"] !== "number") {
      return NextResponse.json(
        { error: "Invalid missedHits value" },
        { status: 400 },
      );
    } else if (typeof payload["missedHits"] !== "number") {
      return NextResponse.json(
        { error: "Invalid missedHits value" },
        { status: 400 },
      );
    } else if (typeof payload["timePlayed"] !== "number") {
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
    } = payload as {
      level: number;
      newLevel: number;
      correctHits: number;
      incorrectHits: number;
      missedHits: number;
      timePlayed: number;
    };

    const supabase = await createClient();

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
