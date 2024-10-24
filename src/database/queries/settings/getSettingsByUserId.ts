import { db } from "@/database/db";
import { users } from "@/database/schemas/profilesTable";
import {
  settingsTable,
  type SettingsType,
} from "@/database/schemas/settingsTable";
import { eq } from "drizzle-orm";

export default async function getSettingsByUserId(
  id: string,
): Promise<SettingsType | null> {
  const userSettings = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .innerJoin(settingsTable, eq(users.settingsId, settingsTable.id))
    .then((res) => (res.length === 1 ? res[0].settings : null));

  return userSettings;
}
