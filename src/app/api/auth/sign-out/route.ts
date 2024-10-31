import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      return NextResponse.json({ error: "Invalid request" }, { status: 500 });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error signing out:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
