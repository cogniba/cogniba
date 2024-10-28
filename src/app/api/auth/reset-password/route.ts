import { createClient } from "@/lib/supabase/server";
import { ForgotPasswordSchema } from "@/zod/schemas/ForgotPasswordSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsedData = ForgotPasswordSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = parsedData.data;

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/update-password`,
    });

    if (error) {
      console.error("Error signing in:", error);
      return NextResponse.json({ error: "Invalid request" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Reset password email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
