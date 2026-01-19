"use server";

import { redirect } from "next/navigation";
import getEnv from "@/lib/env";

export default async function redirectToError(message: string): Promise<never> {
  await Promise.resolve();
  const error = new Error(message);
  console.error(error);

  const errorUrl = new URL(`${getEnv("NEXT_PUBLIC_SITE_URL")}/error`);
  errorUrl.searchParams.set("message", error.message);
  redirect(errorUrl.toString());
}
