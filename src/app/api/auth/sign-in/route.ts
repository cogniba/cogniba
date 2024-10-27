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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.code === "invalid_credentials") {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 },
        );
      } else {
        console.error("Error signing in:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 500 });
      }
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
