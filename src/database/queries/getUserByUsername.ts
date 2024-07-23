"use server";

import { db } from "@/database/db";
import { users } from "../schemas/auth";
import { eq } from "drizzle-orm";

export default async function getUserByUsername(username: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .then((res) => res[0] ?? null);

  return user;
}
