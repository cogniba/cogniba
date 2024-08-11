"use server";

import { db } from "@/database/db";
import getSessionUser from "./getSessionUser";
import { users } from "@/database/schemas/auth";
import { eq } from "drizzle-orm";

export default async function updateUserHasFinishedTutorial(
  hasFinishedTutorial: boolean,
): Promise<void> {
  const { id } = await getSessionUser();

  const user = await db
    .update(users)
    .set({ hasFinishedTutorial })
    .where(eq(users.id, id))
    .returning()
    .then((res) => (res.length === 1 ? res[0] : null));

  if (!user) {
    throw new Error("Failed to update user hasFinishedTutorial");
  }
}
