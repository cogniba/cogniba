import getSessionUser from "./getSessionUser";

import { db } from "@/database/db";
import { users } from "@/database/schemas/profilesTable";
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

// TODO
