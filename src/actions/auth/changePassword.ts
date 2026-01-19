"use server";

import createClient from "@/lib/supabase/server";
import type { ChangePasswordSchemaType } from "@/zod/schemas/ChangePasswordSchema";
import { err, ok, type Result } from "@/lib/result";

function getErrorMessage(code: string): string {
  if (code === "weak_password") {
    return "Password is too weak. Please choose a stronger password.";
  } else if (code === "same_password") {
    return "New password must be different from your current password.";
  } else if (code === "reauthentication_needed") {
    return "Please sign in again before changing your password.";
  } else if (code === "over_request_rate_limit") {
    return "Too many attempts. Please try again later.";
  } else if (code === "user_not_found") {
    return "User account not found.";
  } else {
    return "An unexpected error occurred while changing your password.";
  }
}

export default async function changePassword(
  data: ChangePasswordSchemaType,
): Promise<Result<{ success: true }>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      if (error.code) {
        return err(getErrorMessage(error.code));
      }

      const changeError = new Error(
        "An unexpected error occurred while changing your password.",
      );
      console.error(changeError);
      return err(changeError.message);
    }

    return ok({ success: true });
  } catch (error) {
    console.error(error);
    return err("An unexpected error occurred");
  }
}
