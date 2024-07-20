"use server";

import * as z from "zod";
import { signIn } from "@/auth/auth";
import { SignInSchema } from "@/zod/schemas/SignInSchema";

export default async function handleSignIn(data: z.infer<typeof SignInSchema>) {
  const validatedData = SignInSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid credentials" };
  }

  // await signIn("credentials", data);

  return { success: "Sign in success" };
}
