"use server";

import { db } from "@/database";
import { settingsTable } from "@/database/schemas/settingsTable";
import getUserOrError from "@/lib/auth/getUserOrError";
import { err, ok, type Result } from "@/lib/result";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import type { UpdateSettingsSchemaType } from "@/zod/schemas/UpdateSettingsSchema";
import { UpdateSettingsSchema } from "@/zod/schemas/UpdateSettingsSchema";

export default async function updateSettings(
  input: UpdateSettingsSchemaType,
): Promise<Result<{ success: true }>> {
  const parsed = UpdateSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return err("Invalid settings payload");
  }

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
      .update(settingsTable)
      .set({ showFeedback: parsed.data.showFeedback })
      .where(eq(settingsTable.userId, user.id));

    revalidatePath("/app/settings");

    return ok({ success: true });
  } catch (error) {
    console.error("Error updating settings:", error);
    return err("Internal server error");
  }
}
