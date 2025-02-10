"use server";

import { db } from "@/database";
import { settingsTable, SettingsType } from "@/database/schemas/settingsTable";
import createClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export default async function getSettings(): Promise<{
  settings?: SettingsType;
  error?: string;
}> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: "Failed to get user" };
    }

    const settings = await db
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.userId, user.id))
      .then((res) => (res.length === 1 ? res[0] : null));
    if (settings === null) {
      return { error: "Failed to get settings" };
    }

    return { settings };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred" };
  }
}
