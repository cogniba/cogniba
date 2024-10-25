import AppearanceSetting from "./(components)/(settings)/AppearanceSetting";
import ShowFeedbackSettings from "./(components)/(settings)/ShowFeedbackSettings";
import SettingsCard from "./(components)/SettingsCard";
import ChangePasswordSettings from "./(components)/(settings)/ChangePasswordSettings";
import { SettingsType } from "@/database/schemas/settingsTable";

export default async function SettingsPage() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/settings/get-settings",
    { method: "GET" },
  );
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
