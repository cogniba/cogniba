"use server";

import { ChangePasswordSchema } from "@/zod/schemas/ChangePasswordSchema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import updateUserPassword from "@/database/queries/users/updateUserPassword";
import { isRedirectError } from "next/dist/client/components/redirect";
import getUser from "@/database/queries/users/getUser";

export default async function handleChangePassword(
  data: z.infer<typeof ChangePasswordSchema>,
): Promise<{ success?: string; error?: string }> {
  const validatedData = ChangePasswordSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Invalid credentials" };
  }

  const { oldPassword, newPassword, confirmPassword } = validatedData.data;

  const { password } = await getUser();

  const passwordsMatch = await bcrypt.compare(oldPassword, password);
  if (!passwordsMatch) {
    return { error: "Wrong old password" };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match" };
  }
  if (newPassword === oldPassword) {
    return { error: "New password must be different from old password" };
  }

  try {
    await updateUserPassword(newPassword);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { error: "An error occurred" };
  }

  return { success: "Password changed successfully" };
}
