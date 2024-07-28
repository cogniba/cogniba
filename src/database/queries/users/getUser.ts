"use server";

import { auth } from "@/auth/auth";

export default async function getUser() {
  const session = await auth();

  const user = session?.user;
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
