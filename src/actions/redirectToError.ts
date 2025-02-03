"use server";

import { redirect } from "next/navigation";

export default async function redirectToError(message: string) {
  const error = new Error(message);
  console.error(error);

  const errorUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/error`);
  errorUrl.searchParams.set("message", error.message);
  redirect(errorUrl.toString());
}
