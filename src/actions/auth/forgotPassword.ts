"use server";

import createClient from "@/lib/supabase/server";
import getEnv from "@/lib/env";
import type { ForgotPasswordSchemaType } from "@/zod/schemas/ForgotPasswordSchema";
import { err, ok, type Result } from "@/lib/result";

function getErrorMessage(code: string): string {
  if (code === "user_not_found") {
    return "No account found with this email address.";
  } else if (code === "over_request_rate_limit") {
    return "Too many attempts. Please try again later.";
  } else if (code === "over_email_send_rate_limit") {
    return "Too many reset requests. Please try again later.";
  } else if (code === "email_address_not_authorized") {
    return "This email address is not authorized for password reset.";
  } else if (code === "provider_disabled") {
    return "Password reset is currently disabled.";
  } else {
    return "An unexpected error occurred while sending the reset email.";
  }
}

export default async function forgotPassword(
  data: ForgotPasswordSchemaType,
): Promise<Result<{ success: true }>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${getEnv("NEXT_PUBLIC_SITE_URL")}/app/settings/change-password`,
    });

    if (error) {
      if (error.code) {
        return err(getErrorMessage(error.code));
      }

      const resetError = new Error(
        "An unexpected error occurred while sending the reset email.",
      );
      console.error(resetError);
      return err(resetError.message);
    }

    return ok({ success: true });
  } catch (error) {
    console.error(error);
    return err("An unexpected error occurred");
  }
}
