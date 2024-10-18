"use server";

import getUserCanChangeSettings from "@/database/queries/settings/getUserCanChangeSettings";
import updateUserSettings from "@/database/queries/settings/updateUserSettings";
import getSessionUser from "@/database/queries/users/getSessionUser";

interface updateSettingsProps {
  showFeedback?: boolean;
  canChildrenChangeSettings?: boolean;
}

export default async function updateSettings({
  showFeedback,
  canChildrenChangeSettings,
}: updateSettingsProps) {
  const { role } = await getSessionUser();

  if (role === "child") {
    const canChangeSettings = getUserCanChangeSettings();
    if (!canChangeSettings) {
      return;
    }
  }

  await updateUserSettings({ showFeedback, canChildrenChangeSettings });
}
