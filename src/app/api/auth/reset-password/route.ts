import { db } from "@/database";
import { profilesTable } from "@/database/schemas/profilesTable";
import createClient from "@/lib/supabase/server";
import { ForgotPasswordSchema } from "@/zod/schemas/ForgotPasswordSchema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import getEnv from "@/lib/env";

export async function POST(request: Request) {
  try {
    const data: unknown = await request.json();
    const parsedData = ForgotPasswordSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = parsedData.data;

    const emailInUse = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.email, email))
      .then((res) => (res.length > 0 ? true : false));

    if (!emailInUse) {
      return NextResponse.json(
        { error: "Email is not registered" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getEnv("NEXT_PUBLIC_SITE_URL")}/change-password`,
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
