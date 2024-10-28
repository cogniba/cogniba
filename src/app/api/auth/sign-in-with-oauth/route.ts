import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (typeof data.provider !== "string") {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    const { provider } = data;

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in with oauth:", error);
      return NextResponse.json({ error: "Invalid request" }, { status: 500 });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error signing in with oauth:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
