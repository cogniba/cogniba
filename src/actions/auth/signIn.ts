"use server";

import createClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SignInSchemaType } from "@/zod/schemas/SignInSchema";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import posthogClient from "@/lib/posthogClient";

function getErrorMessage(code: string): string {
  if (code === "invalid_credentials") {
    return "Invalid email or password.";
  } else if (code === "user_not_found") {
    return "No user found with these credentials.";
  } else if (code === "email_not_confirmed") {
    return "Please verify your email address before signing in.";
  } else if (code === "user_banned") {
    return "This account has been temporarily suspended.";
  } else if (code === "session_expired") {
    return "Your session has expired. Please sign in again.";
  } else if (code === "email_address_not_authorized") {
    return "This email address is not authorized to sign in.";
  } else if (code === "phone_not_confirmed") {
    return "Please verify your phone number before signing in.";
  } else if (code === "signup_disabled") {
    return "New account creation is currently disabled.";
  } else if (code === "provider_disabled") {
    return "This sign-in method is currently disabled.";
  } else if (code === "over_request_rate_limit") {
    return "Too many attempts. Please try again later.";
  } else if (code === "request_timeout") {
    return "The request timed out. Please try again.";
  } else if (code === "mfa_verification_failed") {
    return "Multi-factor authentication failed. Please try again.";
  } else if (code === "insufficient_aal") {
    return "Additional authentication required.";
  } else if (code === "captcha_failed") {
    return "Captcha verification failed. Please try again.";
  } else {
    return "An unexpected error occurred during sign in.";
  }
}

export default async function signIn(
  data: SignInSchemaType,
): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();

    const { data: authData, error } =
      await supabase.auth.signInWithPassword(data);

    if (error) {
      if (error.code) {
        return { error: getErrorMessage(error.code) };
      } else {
        const error = new Error("An unexpected error occurred during sign in.");
        console.error(error);
        return { error: error.message };
      }
    }

    const posthog = posthogClient();
    posthog.capture({
      distinctId: authData.user.id,
      event: "user_signin_success",
      properties: {
        provider: "email",
      },
    });
    await posthog.shutdown();

    revalidatePath("/", "layout");
    redirect("/app");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error(error);
    return { error: "An unexpected error occurred" };
  }
}
