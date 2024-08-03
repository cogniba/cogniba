import getUserSettings from "@/database/queries/settings/getUserSettings";
import AppearanceSetting from "./(components)/(settings)/AppearanceSetting";
import ChildrenChangeSettingsSetting from "./(components)/(settings)/ChildrenChangeSettingsSetting";
import ShowFeedbackSettings from "./(components)/(settings)/ShowFeedbackSettings";

export default async function SettingsPage() {
  const settings = await getUserSettings();

  return (
    <div className="flex justify-center">
      <div className="my-10 flex w-full max-w-6xl flex-col divide-y divide-slate-200 rounded-lg border border-slate-200/80 bg-white p-8 shadow-sm *:py-8 first:*:pt-0 last:*:pb-0 dark:divide-slate-800 dark:border-slate-800/80 dark:bg-slate-900/30 dark:shadow-md dark:shadow-black/50">
        <AppearanceSetting />
        <ChildrenChangeSettingsSetting
          startingCanChildrenChangeSettings={settings.canChildrenChangeSettings}
        />
        <ShowFeedbackSettings startingShowFeedback={settings.showFeedback} />
      </div>
    </div>
  );
}
