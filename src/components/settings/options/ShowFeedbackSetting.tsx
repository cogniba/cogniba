"use client";

import SettingsItem from "@/components/settings/SettingsItem";
import { useToast } from "@/hooks/use-toast";
import updateSettings from "@/actions/settings/updateSettings";
import { useState } from "react";

type ShowFeedbackSettingProps = {
  startingShowFeedback: boolean;
};

export default function ShowFeedbackSetting({
  startingShowFeedback,
}: ShowFeedbackSettingProps) {
  const [showFeedback, setShowFeedback] =
    useState<boolean>(startingShowFeedback);

  const { toast } = useToast();

  const updateShowFeedback = async (value: string) => {
    const nextValue = value === "enabled";
    setShowFeedback(nextValue);

    const result = await updateSettings({ showFeedback: nextValue });

    if (result.error) {
      toast({ title: result.error, variant: "destructive" });
      setShowFeedback((prev) => !prev);
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
      onValueChange={(value) => {
        void updateShowFeedback(value);
      }}
    />
  );
}
