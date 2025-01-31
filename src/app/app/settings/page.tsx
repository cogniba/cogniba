import AppearanceSetting from "@/components/settings/options/AppearanceSetting";
import ShowFeedbackSettings from "@/components/settings/options/ShowFeedbackSetting";
import SettingsCard from "@/components/settings/SettingsCard";
import ChangePasswordSettings from "@/components/settings/options/ChangePasswordSetting";
import { SettingsType } from "@/database/schemas/settingsTable";
import getSettingsRequest from "@/lib/server/settings/getSettingsRequest";
import SimpleMessageScreen from "@/components/SimpleMessageScreen";
import BillingSetting from "@/components/settings/options/BillingSetting";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const response = await getSettingsRequest();
  if (!response.ok) {
    return (
      <SimpleMessageScreen
        mainMessage="Error getting settings"
        secondaryMessage="Please, reload the page to try again"
        variant="error"
      />
    );
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
      <SettingsCard>
        <BillingSetting />
      </SettingsCard>
    </div>
  );
}
