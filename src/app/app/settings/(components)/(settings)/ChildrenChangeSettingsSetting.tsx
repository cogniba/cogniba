"use client";

import getUserSettings from "@/database/queries/settings/getUserSettings";
import SettingsItem from "../SettingsItem";
import updateUserSettings from "@/database/queries/settings/updateUserSettings";
import { useEffect, useState } from "react";

export default function ChildrenChangeSettingsSetting() {
  const [canChildrenChangeSettings, setCanChildrenChangeSettings] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { canChildrenChangeSettings } = await getUserSettings();
      setCanChildrenChangeSettings(canChildrenChangeSettings);
    };

    fetchSettings();
  }, []);

  const updateSettings = async (value: string) => {
    updateUserSettings({ canChildrenChangeSettings: value === "enabled" });
  };

  return (
    <SettingsItem
      title="Allow children to change settings"
      description="Your children will be able to change their own settings"
      options={[
        { value: "enabled", label: "Enabled" },
        { value: "disabled", label: "Disabled" },
      ]}
      defaultOption={canChildrenChangeSettings ? "enabled" : "disabled"}
      onValueChange={(value) => updateSettings(value)}
    />
  );
}
