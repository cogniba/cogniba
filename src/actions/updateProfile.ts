"use server";

import { db } from "@/database";
import { profilesTable } from "@/database/schemas/profilesTable";
import createClient from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type UpdateProfileParams = {
  hasFinishedTutorial: boolean;
}

export default async function updateProfile({
  hasFinishedTutorial,
}: UpdateProfileParams): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: "Failed to get user" };
    }

    await db
      .update(profilesTable)
      .set({ hasFinishedTutorial })
      .where(eq(profilesTable.userId, user.id));

    revalidatePath("/", "layout");
    return {};
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "An unexpected error occurred" };
  }
}
