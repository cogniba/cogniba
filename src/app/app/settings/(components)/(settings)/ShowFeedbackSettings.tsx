"use client";

import getUserSettings from "@/database/queries/settings/getUserSettings";
import SettingsItem from "../SettingsItem";
import updateUserSettings from "@/database/queries/settings/updateUserSettings";
import { useEffect, useState } from "react";

export default function ShowFeedbackSettings() {
  const [showFeedback, setShowFeedback] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { showFeedback } = await getUserSettings();
      setShowFeedback(showFeedback);
    };

    fetchSettings();
  }, []);

  const updateSettings = async (value: string) => {
    await updateUserSettings({ showFeedback: value === "enabled" });
  };

  return (
    <SettingsItem
      title="Show feedback"
      description="The player will receive feedback while playing. Recommended when starting out"
      options={[
        { value: "enabled", label: "Enabled" },
        { value: "disabled", label: "Disabled" },
      ]}
      defaultOption={showFeedback ? "enabled" : "disabled"}
      onValueChange={(value) => updateSettings(value)}
    />
  );
}
