"use server";

import createClient from "@/lib/supabase/server";
import { ForgotPasswordSchemaType } from "@/zod/schemas/ForgotPasswordSchema";

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
): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings/change-password`,
    });

    if (error) {
      if (error.code) {
        return { error: getErrorMessage(error.code) };
      } else {
        const error = new Error(
          "An unexpected error occurred while sending the reset email.",
        );
        console.error(error);
        return { error: error.message };
      }
    }

    return {};
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred" };
  }
}
