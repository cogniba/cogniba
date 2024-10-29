import { db } from "@/database/db";
import { profilesTable } from "@/database/schemas/profilesTable";
import { createClient } from "@/lib/supabase/server";
import { ChangePasswordSchema } from "@/zod/schemas/ChangePasswordSchema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsedData = ChangePasswordSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const { password } = parsedData.data;

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      if (error.code === "same_password") {
        return NextResponse.json(
          { error: "New password cannot be the same as the old one" },
          { status: 500 },
        );
      } else if (error.code === "weak_password") {
        return NextResponse.json(
          { error: "Password is too weak" },
          { status: 500 },
        );
      } else {
        console.error("Error changing password:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 500 });
      }
    }

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
