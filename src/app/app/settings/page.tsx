import getUserSettings from "@/database/queries/settings/getUserSettings";
import AppearanceSetting from "./(components)/(settings)/AppearanceSetting";
import ShowFeedbackSettings from "./(components)/(settings)/ShowFeedbackSettings";
import getUserCanChangeSettings from "@/database/queries/settings/getUserCanChangeSettings";
import SettingsCard from "./(components)/SettingsCard";
import ChangePasswordSettings from "./(components)/(settings)/ChangePasswordSettings";

export default async function SettingsPage() {
  const settings = await getUserSettings();
  const canChangeSettings = await getUserCanChangeSettings();

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
