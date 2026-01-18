type EnvKey =
  | "DATABASE_URL"
  | "NEXT_PUBLIC_SITE_URL"
  | "NEXT_PUBLIC_FEEDBACK_EMAIL"
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  | "RESEND_API_KEY"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET"
  | "NEXT_PUBLIC_POSTHOG_KEY"
  | "NEXT_PUBLIC_POSTHOG_HOST";

type Env = Record<EnvKey, string>;

export default function getEnv(key: EnvKey): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export type { Env };
