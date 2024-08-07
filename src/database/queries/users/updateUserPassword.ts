"use server";

import { db } from "@/database/db";
import getSessionUser from "./getSessionUser";
import { users } from "@/database/schemas/auth";
import saltAndHashPassword from "@/lib/saltAndHashPassword";
import { eq } from "drizzle-orm";

export default async function updateUserPassword(
  password: string,
): Promise<void> {
  const { id } = await getSessionUser();

  const hashedPassword = await saltAndHashPassword(password);

  const user = await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, id))
    .returning()
    .then((res) => (res.length === 1 ? res[0] : null));

  if (!user) {
    throw new Error("Failed to change password");
  }
}
