"use server";

import createClient from "@/lib/supabase/server";
import { err, ok, type Result } from "@/lib/result";

export default async function signOut(): Promise<Result<{ success: true }>> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      return err("Failed to sign out");
    }

    return ok({ success: true });
  } catch (error) {
    console.error("Error signing out:", error);
    return err("Internal server error");
  }
}
