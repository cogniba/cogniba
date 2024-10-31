import { db } from "@/database/db";
import { profilesTable } from "@/database/schemas/profilesTable";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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

    const { hasFinishedTutorial } = body;

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 400 },
      );
    }

    const userId = data.user.id;

    await db
      .update(profilesTable)
      .set({ hasFinishedTutorial })
      .where(eq(profilesTable.id, userId));

    revalidatePath("/");
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
