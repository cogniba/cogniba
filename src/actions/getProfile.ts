"use server";

import { db } from "@/database";
import type { ProfileType } from "@/database/schemas/profilesTable";
import { profilesTable } from "@/database/schemas/profilesTable";
import getUserOrError from "@/lib/auth/getUserOrError";
import { err, ok, type Result } from "@/lib/result";
import { eq } from "drizzle-orm";

export default async function getProfile(): Promise<Result<ProfileType>> {
  const userResult = await getUserOrError();
  if (userResult.error) {
    return err(userResult.error);
  }

  const { data: user } = userResult;
  if (!user) {
    return err("Failed to get user");
  }

  try {
    const profile = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.userId, user.id))
      .then((res) => (res.length === 1 ? res[0] : null));
    if (!profile) {
      return err("Profile not found");
    }

    return ok(profile);
  } catch (error) {
    console.error(error);
    return err("An unexpected error occurred");
  }
}
