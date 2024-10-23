import { createClient } from "@/lib/supabase/server";
import { SignInSchema } from "@/zod/schemas/SignInSchema";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsedData = SignInSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const { email, password } = parsedData.data;

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.code === "email_exists") {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 },
        );
      } else if (error.code === "weak_password") {
        return NextResponse.json(
          { error: "Password is too weak" },
          { status: 400 },
        );
      } else {
        console.error("Error signing up:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 500 });
      }
    }

    revalidatePath("/", "layout");
    NextResponse.redirect("/");
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
