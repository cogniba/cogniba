import getUser from "../users/getUser";

import {
  settingsTable,
  type SettingsType,
} from "@/database/schemas/settingsTable";
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
    .update(settingsTable)
    .set({
      showFeedback,
      canChildrenChangeSettings,
    })
    .where(eq(settingsTable.id, settingsId))
    .returning()
    .then((res) => (res.length === 1 ? res[0] : null));
  if (!userSettings) {
    throw new Error("Error updating user settings");
  }

  revalidatePath("/app");

  return userSettings;
}
