"use server";

import { db } from "@/database";
import { profilesTable } from "@/database/schemas/profilesTable";
import getUserOrError from "@/lib/auth/getUserOrError";
import { err, ok, type Result } from "@/lib/result";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type UpdateProfileParams = {
  hasFinishedTutorial: boolean;
};

export default async function updateProfile({
  hasFinishedTutorial,
}: UpdateProfileParams): Promise<Result<{ success: true }>> {
  const userResult = await getUserOrError();
  if (userResult.error) {
    return err(userResult.error);
  }

  const { data: user } = userResult;
  if (!user) {
    return err("Failed to get user");
  }

  try {
    await db
      .update(profilesTable)
      .set({ hasFinishedTutorial })
      .where(eq(profilesTable.userId, user.id));

    revalidatePath("/", "layout");
    return ok({ success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return err("An unexpected error occurred");
  }
}
