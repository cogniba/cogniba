"use client";

import SettingsItem from "@/components/settings/SettingsItem";
import { useToast } from "@/hooks/use-toast";

import { useState } from "react";

interface ShowFeedbackSettingProps {
  startingShowFeedback: boolean;
}

export default function ShowFeedbackSetting({
  startingShowFeedback,
}: ShowFeedbackSettingProps) {
  const [showFeedback, setShowFeedback] =
    useState<boolean>(startingShowFeedback);

  const { toast } = useToast();

  const updateShowFeedback = async (value: string) => {
    setShowFeedback(value === "enabled");

    const response = await fetch("/api/settings/update-settings", {
      method: "POST",
      body: JSON.stringify({ showFeedback: value === "enabled" }),
    });

    if (!response.ok) {
      toast({ title: "Unexpected error occurred", variant: "destructive" });
    }
  };

  return (
    <SettingsItem
      title="Show feedback"
      description="You will receive feedback while playing. Recommended when starting out"
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
