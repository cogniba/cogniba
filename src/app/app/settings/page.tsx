import AppearanceSetting from "./(components)/(settings)/AppearanceSetting";
import ShowFeedbackSettings from "./(components)/(settings)/ShowFeedbackSettings";
import SettingsCard from "./(components)/SettingsCard";
import ChangePasswordSettings from "./(components)/(settings)/ChangePasswordSettings";
import { settingsTable, SettingsType } from "@/database/schemas/settingsTable";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";

export default async function SettingsPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return <div>Error getting user</div>;
  }

  const userId = data.user.id;

  const settings = await db
    .select()
    .from(settingsTable)
    .where(eq(settingsTable.userId, userId))
    .then((res) => (res.length === 1 ? res[0] : null));
  if (!settings) {
    return <div>Error getting settings</div>;
  }

  return (
    <div className="mx-6 my-10 flex flex-col items-center gap-6">
      <SettingsCard>
        <AppearanceSetting />
      </SettingsCard>
      <SettingsCard>
        <ShowFeedbackSettings startingShowFeedback={settings.showFeedback} />
      </SettingsCard>
      <SettingsCard>
        <ChangePasswordSettings />
      </SettingsCard>
    </div>
  );
}
