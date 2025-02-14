import { NextResponse } from "next/server";
import createClient from "@/lib/supabase/server";
import posthogClient from "@/lib/posthogClient";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const type = searchParams.get("type");
  const provider = searchParams.get("provider");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      if (provider === "google" && type) {
        const posthog = posthogClient();
        posthog.capture({
          distinctId: data.user.id,
          event:
            type === "signup" ? "user_signup_success" : "user_signin_success",
          properties: {
            provider: "google",
          },
        });
        await posthog.shutdown();
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/error`);
}
