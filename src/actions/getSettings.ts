"use server";

import { db } from "@/database";
import type { SettingsType } from "@/database/schemas/settingsTable";
import { settingsTable } from "@/database/schemas/settingsTable";
import getUserOrError from "@/lib/auth/getUserOrError";
import { err, ok, type Result } from "@/lib/result";
import { eq } from "drizzle-orm";

export default async function getSettings(): Promise<Result<SettingsType>> {
  const userResult = await getUserOrError();
  if (userResult.error) {
    return err(userResult.error);
  }

  const { data: user } = userResult;
  if (!user) {
    return err("Failed to get user");
  }

  try {
    const settings = await db
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.userId, user.id))
      .then((res) => res[0]);
    if (!settings) {
      return err("Failed to get settings");
    }

    return ok(settings);
  } catch (error) {
    console.error(error);
    return err("An unexpected error occurred");
  }
}
