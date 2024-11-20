"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/../database.types";

export default function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain:
          process.env.NODE_ENV === "production" ? ".cogniba.com" : undefined,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    },
  );
}
