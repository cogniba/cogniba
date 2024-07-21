"use server";

import { signOut } from "@/auth/auth";

export default async function handleSignOut() {
  await signOut({ redirectTo: "/sign-in" });
}
