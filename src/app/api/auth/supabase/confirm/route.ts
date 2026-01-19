import type { EmailOtpType } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";
import createClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import posthogClient from "@/lib/posthogClient";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error && data.user) {
      const posthog = posthogClient();
      if (type === "signup") {
        posthog.capture({
          distinctId: data.user.id,
          event: "user_signup_success",
          properties: {
            provider: "email",
          },
        });
      } else if (type === "recovery") {
        posthog.capture({
          distinctId: data.user.id,
          event: "email_recovery_success",
        });
      }
      await posthog.shutdown();

      redirect(next);
    }
  }

  redirect("/error");
}
