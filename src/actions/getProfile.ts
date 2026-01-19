"use server";

import { db } from "@/database";
import type { ProfileType } from "@/database/schemas/profilesTable";
import { profilesTable } from "@/database/schemas/profilesTable";
import createClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export default async function getProfile(): Promise<{
  profile?: ProfileType;
  error?: string;
}> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      const error = new Error("User not found");
      console.error(error);
      return { error: error.message };
    }

    const profile = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.userId, user.id))
      .then((res) => (res.length === 1 ? res[0] : null));
    if (!profile) {
      const error = new Error("Profile not found");
      console.error(error);
      return { error: error.message };
    }

    return { profile };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred" };
  }
}
