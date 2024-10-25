import AppearanceSetting from "./(components)/(settings)/AppearanceSetting";
import ShowFeedbackSettings from "./(components)/(settings)/ShowFeedbackSettings";
import SettingsCard from "./(components)/SettingsCard";
import ChangePasswordSettings from "./(components)/(settings)/ChangePasswordSettings";
import { SettingsType } from "@/database/schemas/settingsTable";
import getSettings from "@/lib/server/settings/getSettings";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const response = await getSettings();
  if (!response.ok) {
    <div>Error getting settings</div>;
  }

  const { settings }: { settings: SettingsType } = await response.json();

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
