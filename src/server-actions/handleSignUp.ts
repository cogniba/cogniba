"use server";

import * as z from "zod";
import { SignUpSchema } from "@/zod/schemas/SignUpSchema";
import createUser from "@/database/queries/createUser";

export default async function handleSignUp(data: z.infer<typeof SignUpSchema>) {
  const validatedData = SignUpSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid information" };
  }

  const { role, email, fullName, username, password } = validatedData.data;

  const user = await createUser(role, email, fullName, username, password);
  if (!user) {
    return { error: "Username already exists" };
  }

  return { success: "Sign up success" };
}
