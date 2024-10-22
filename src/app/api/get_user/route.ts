import { db } from "@/database/db";
import { profilesTable } from "@/database/schemas/profiles";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
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

    const user = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.id, userId))
      .then((res) => (res.length === 1 ? res[0] : null));

    if (!user) {
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
