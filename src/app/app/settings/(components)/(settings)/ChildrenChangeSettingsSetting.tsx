"use client";

import SettingsItem from "../SettingsItem";
import updateUserSettings from "@/database/queries/settings/updateUserSettings";
import { useState } from "react";

interface ChildrenChangeSettingsSettingProps {
  startingCanChildrenChangeSettings: boolean | null;
}

export default function ChildrenChangeSettingsSetting({
  startingCanChildrenChangeSettings,
}: ChildrenChangeSettingsSettingProps) {
  const [canChildrenChangeSettings, setCanChildrenChangeSettings] = useState<
    boolean | null
  >(startingCanChildrenChangeSettings);

  const updateSettings = async (value: string) => {
    setCanChildrenChangeSettings(value === "enabled");
    await updateUserSettings({
      canChildrenChangeSettings: value === "enabled",
    });
  };

  return (
    <SettingsItem
      title="Allow children to change settings"
      description="Your children will be able to change their own settings"
      options={[
        { value: "enabled", label: "Enabled" },
        { value: "disabled", label: "Disabled" },
      ]}
      value={canChildrenChangeSettings ? "enabled" : "disabled"}
      onValueChange={(value) => updateSettings(value)}
    />
  );
}
