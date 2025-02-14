"use server";

import createClient from "@/lib/supabase/server";
import { SignUpSchemaType } from "@/zod/schemas/SignUpSchema";
import posthogClient from "@/lib/posthogClient";

function getErrorMessage(code: string): string {
  if (code === "user_already_exists") {
    return "An account with this email already exists.";
  } else if (code === "signup_disabled") {
    return "New account creation is currently disabled.";
  } else if (code === "weak_password") {
    return "Password is too weak. Please choose a stronger password.";
  } else if (code === "email_address_invalid") {
    return "Please use a valid email address.";
  } else if (code === "provider_disabled") {
    return "This sign-up method is currently disabled.";
  } else if (code === "over_request_rate_limit") {
    return "Too many attempts. Please try again later.";
  } else if (code === "email_address_not_authorized") {
    return "This email address is not authorized for sign-up.";
  } else if (code === "validation_failed") {
    return "Please check your input and try again.";
  } else if (code === "request_timeout") {
    return "The request timed out. Please try again.";
  } else if (code === "captcha_failed") {
    return "Captcha verification failed. Please try again.";
  } else {
    return "An unexpected error occurred during sign up.";
  }
}

export default async function signUp(
  data: SignUpSchemaType,
): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });

    if (error) {
      if (error.code) {
        return { error: getErrorMessage(error.code) };
      } else {
        const error = new Error("An unexpected error occurred during sign up.");
        console.error(error);
        return { error: error.message };
      }
    }

    if (authData.user) {
      const posthog = posthogClient();
      posthog.capture({
        distinctId: authData.user.id,
        event: "user_signup_verification_email_send",
        properties: {
          provider: "email",
        },
      });
      await posthog.shutdown();
    }

    return {};
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred" };
  }
}
