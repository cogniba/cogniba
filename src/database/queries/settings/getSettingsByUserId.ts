import { db } from "@/database/db";
import { users, UserType } from "@/database/schemas/auth";
import { settings, SettingsType } from "@/database/schemas/settings";
import { eq } from "drizzle-orm";

export default async function getSettingsByUserId(
  id: string,
): Promise<SettingsType | null> {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .innerJoin(settings, eq(users.settingsId, settings.id))
    .then((res) => (res.length === 1 ? res[0].settings : null));

  return user;
}
