import { createClient } from "@/lib/supabase/server";
import { SignUpSchema } from "@/zod/schemas/SignUpSchema";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = SignUpSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const { fullName, email, password } = parsedData.data;

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
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
    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error("Error signing up:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
