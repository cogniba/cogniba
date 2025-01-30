import SettingsCard from "@/components/settings/SettingsCard";
import AppearanceSetting from "../../../components/settings/options/AppearanceSetting";
import ChangePasswordSetting from "@/components/settings/options/ChangePasswordSetting";
import BillingSetting from "@/components/settings/options/BillingSetting";
import createClient from "@/lib/supabase/server";
import { db } from "@/database";
import { settingsTable } from "@/database/schemas/settingsTable";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    const error = new Error("Failed to load user data");
    console.error(error);

    const errorUrl = new URL("/error", origin);
    errorUrl.searchParams.set("message", error.message);
    redirect(errorUrl.toString());
  }

  const settings = await db
    .select()
    .from(settingsTable)
    .where(eq(settingsTable.userId, user.id))
    .then((res) => (res.length === 1 ? res[0] : null));
  if (settings === null) {
    const error = new Error("Failed to load settings");
    console.error(error);

    const errorUrl = new URL("/error", origin);
    errorUrl.searchParams.set("message", error.message);
    redirect(errorUrl.toString());
  }

  return (
    <div className="mx-6 my-10 flex flex-col items-center gap-6">
      <SettingsCard>
        <AppearanceSetting />
      </SettingsCard>
      <SettingsCard>
        <ChangePasswordSetting />
      </SettingsCard>
      <SettingsCard>
        <BillingSetting />
      </SettingsCard>
    </div>
  );
}
