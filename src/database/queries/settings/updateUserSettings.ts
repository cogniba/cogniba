"use server";

import { settings, SettingsType } from "@/database/schemas/settings";
import getUser from "../users/getUser";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";

interface getUserSettingsProps {
  showFeedback?: boolean;
  canChildrenChangeSettings?: boolean;
}

export default async function updateUserSettings({
  showFeedback,
  canChildrenChangeSettings,
}: getUserSettingsProps): Promise<SettingsType> {
  console.log("AAA");
  const { settingsId } = await getUser();

  const userSettings = await db
    .update(settings)
    .set({
      showFeedback,
      canChildrenChangeSettings,
    })
    .where(eq(settings.id, settingsId))
    .returning()
    .then((res) => (res.length === 1 ? res[0] : null));
  if (!userSettings) {
    throw new Error("Error updating user settings");
  }

  return userSettings;
}
