"use server";

import { signOut } from "@/auth/auth";

export default async function handleSignOut(): Promise<void> {
  await signOut({ redirectTo: "/sign-in" });
}
