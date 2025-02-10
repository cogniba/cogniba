import AppearanceSetting from "@/components/settings/options/AppearanceSetting";
import ShowFeedbackSettings from "@/components/settings/options/ShowFeedbackSetting";
import SettingsCard from "@/components/settings/SettingsCard";
import ChangePasswordSettings from "@/components/settings/options/ChangePasswordSetting";
import SimpleMessageScreen from "@/components/SimpleMessageScreen";
import BillingSetting from "@/components/settings/options/BillingSetting";
import getSettings from "@/actions/getSettings";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { settings, error } = await getSettings();
  if (error || !settings) {
    return (
      <SimpleMessageScreen
        mainMessage="Error getting settings"
        secondaryMessage="Please, reload the page to try again"
        variant="error"
      />
    );
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
      <SettingsCard>
        <BillingSetting />
      </SettingsCard>
    </div>
  );
}
