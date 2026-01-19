import createClient from "@/lib/supabase/server";
import { err, ok, type Result } from "@/lib/result";

export default async function getUserOrError(): Promise<
  Result<{ id: string }>
> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return err("Failed to get user");
  }

  return ok({ id: data.user.id });
}
