import getUserSettings from "@/database/queries/settings/getUserSettings";
import AppearanceSetting from "./(components)/(settings)/AppearanceSetting";
import ChildrenChangeSettingsSetting from "./(components)/(settings)/ChildrenChangeSettingsSetting";
import ShowFeedbackSettings from "./(components)/(settings)/ShowFeedbackSettings";
import getUserCanChangeSettings from "@/database/queries/settings/getUserCanChangeSettings";
import SettingsCard from "./(components)/SettingsCard";
import getSessionUser from "@/database/queries/users/getSessionUser";
import ChangePasswordSettings from "./(components)/(settings)/ChangePasswordSettings";

export default async function SettingsPage() {
  const settings = await getUserSettings();
  const canChangeSettings = await getUserCanChangeSettings();
  const { role } = await getSessionUser();

  return (
    <div className="mx-6 my-10 flex flex-col items-center gap-6">
      <SettingsCard>
        <AppearanceSetting />
      </SettingsCard>
      {(role === "parent" || role === "admin") && (
        <SettingsCard>
          <ChildrenChangeSettingsSetting
            startingCanChildrenChangeSettings={
              settings.canChildrenChangeSettings
            }
          />
        </SettingsCard>
      )}
      <SettingsCard>
        <div>
          {role === "parent" && (
            <div className="pb-8 text-center text-slate-300">
              These settings will be applied to all your children
            </div>
          )}
          {role === "child" && !canChangeSettings && (
            <div className="pb-8 text-center text-slate-300">
              Ask your parent to change these settings
            </div>
          )}
          <ShowFeedbackSettings
            startingShowFeedback={settings.showFeedback}
            disabled={role === "child" && !canChangeSettings}
          />
        </div>
      </SettingsCard>
      <SettingsCard>
        <ChangePasswordSettings />
      </SettingsCard>
    </div>
  );
}
