import { db } from "@/database/db";
import { profilesTable } from "@/database/schemas/profiles";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (typeof body.hasFinishedTutorial !== "boolean") {
      return NextResponse.json(
        { error: "Invalid hasFinishedTutorial value" },
        { status: 400 },
      );
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return NextResponse.json(
        { error: "Failed to get session" },
        { status: 400 },
      );
    }

    const userId = data.session?.user.id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    await db
      .update(profilesTable)
      .set({ hasFinishedTutorial: body.hasFinishedTutorial })
      .where(eq(profilesTable.id, userId));

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
