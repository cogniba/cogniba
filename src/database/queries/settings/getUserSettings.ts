import { settings, SettingsType } from "@/database/schemas/settings";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import getUser from "../users/getUser";

export default async function getUserSettings(): Promise<SettingsType> {
  const { settingsId } = await getUser();

  const userSettings = await db
    .select()
    .from(settings)
    .where(eq(settings.id, settingsId))
    .then((res) => (res.length === 1 ? res[0] : null));
  if (!userSettings) {
    throw new Error("User settings not found");
  }

  return userSettings;
}
