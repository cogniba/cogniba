"use client";

import updateSettings from "@/server-actions/settings/updateSettings";
import SettingsItem from "../SettingsItem";

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

  const updateCanChildrenChangeSettings = async (value: string) => {
    setCanChildrenChangeSettings(value === "enabled");
    await updateSettings({
      canChildrenChangeSettings: value === "enabled",
    });
  };

  return (
    <SettingsItem
      title="Allow children to change settings"
      description="Your children will be able to change their own settings"
      type="select"
      options={[
        { value: "enabled", label: "Enabled" },
        { value: "disabled", label: "Disabled" },
      ]}
      value={canChildrenChangeSettings ? "enabled" : "disabled"}
      onValueChange={(value) => updateCanChildrenChangeSettings(value)}
    />
  );
}
