"use client";

import updateSettings from "@/server-actions/settings/updateSettings";
import SettingsItem from "../SettingsItem";

import { useState } from "react";

interface ShowFeedbackSettingsProps {
  startingShowFeedback: boolean;
}

export default function ShowFeedbackSettings({
  startingShowFeedback,
}: ShowFeedbackSettingsProps) {
  const [showFeedback, setShowFeedback] =
    useState<boolean>(startingShowFeedback);

  const updateShowFeedback = async (value: string) => {
    setShowFeedback(value === "enabled");
    await updateSettings({ showFeedback: value === "enabled" });
  };

  return (
    <SettingsItem
      title="Show feedback"
      description="The player will receive feedback while playing. Recommended when starting out"
      type="select"
      options={[
        { value: "enabled", label: "Enabled" },
        { value: "disabled", label: "Disabled" },
      ]}
      value={showFeedback ? "enabled" : "disabled"}
      onValueChange={(value) => updateShowFeedback(value)}
    />
  );
}
