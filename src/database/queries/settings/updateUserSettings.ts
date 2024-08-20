import getUser from "../users/getUser";

import { settings, type SettingsType } from "@/database/schemas/settings";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface updateUserSettingsProps {
  showFeedback?: boolean;
  canChildrenChangeSettings?: boolean;
}

export default async function updateUserSettings({
  showFeedback,
  canChildrenChangeSettings,
}: updateUserSettingsProps): Promise<SettingsType> {
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

  revalidatePath("/app");

  return userSettings;
}
