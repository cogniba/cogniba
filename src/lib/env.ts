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

type PublicEnvKey = Extract<EnvKey, `NEXT_PUBLIC_${string}`>;

const publicEnv: Record<PublicEnvKey, string | undefined> = {
  NEXT_PUBLIC_SITE_URL: process.env["NEXT_PUBLIC_SITE_URL"],
  NEXT_PUBLIC_FEEDBACK_EMAIL: process.env["NEXT_PUBLIC_FEEDBACK_EMAIL"],
  NEXT_PUBLIC_SUPABASE_URL: process.env["NEXT_PUBLIC_SUPABASE_URL"],
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"],
  NEXT_PUBLIC_POSTHOG_KEY: process.env["NEXT_PUBLIC_POSTHOG_KEY"],
  NEXT_PUBLIC_POSTHOG_HOST: process.env["NEXT_PUBLIC_POSTHOG_HOST"],
};

const isPublicEnvKey = (key: EnvKey): key is PublicEnvKey =>
  Object.prototype.hasOwnProperty.call(publicEnv, key);

export default function getEnv(key: EnvKey): string {
  const value = isPublicEnvKey(key) ? publicEnv[key] : process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export type { Env };
