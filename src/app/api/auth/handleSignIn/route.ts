import { signIn } from "@/auth/auth";
import { SignInSchema } from "@/zod/schemas/SignInSchema";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
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

    const { username, password } = parsedData.data;

    try {
      await signIn("credentials", {
        username,
        password,
        redirectTo: "/app/play",
      });
      return NextResponse.json({ success: "Sign in success" }, { status: 200 });
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      } else if (
        error instanceof AuthError &&
        error.type === "CredentialsSignin"
      ) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 },
        );
      } else {
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 },
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
