"use client";

import SettingsItem from "../SettingsItem";
import updateUserSettings from "@/database/queries/settings/updateUserSettings";
import { useState } from "react";

interface ShowFeedbackSettingsProps {
  startingShowFeedback: boolean;
  disabled?: boolean;
}

export default function ShowFeedbackSettings({
  startingShowFeedback,
  disabled,
}: ShowFeedbackSettingsProps) {
  const [showFeedback, setShowFeedback] =
    useState<boolean>(startingShowFeedback);

  const updateSettings = async (value: string) => {
    setShowFeedback(value === "enabled");
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
      value={showFeedback ? "enabled" : "disabled"}
      onValueChange={(value) => updateSettings(value)}
      disabled={disabled}
    />
  );
}
