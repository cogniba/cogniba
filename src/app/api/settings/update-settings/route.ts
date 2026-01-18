import { db } from "@/database";
import { settingsTable } from "@/database/schemas/settingsTable";
import createClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
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

    if (typeof payload["showFeedback"] !== "boolean") {
      return NextResponse.json(
        { error: "Invalid showFeedback value" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 400 },
      );
    }

    const userId = data.user.id;

    await db
      .update(settingsTable)
      .set({ showFeedback: payload["showFeedback"] })
      .where(eq(settingsTable.userId, userId));

    revalidatePath("/app/settings");

    return NextResponse.json(
      { message: "Settings updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
