"use client";

import { useTheme } from "next-themes";
import SettingsItem from "../SettingsItem";

export default function AppearanceSetting() {
  const { setTheme, theme } = useTheme();

  return (
    <SettingsItem
      title="Appearance"
      description="Choose how you want the application to look"
      options={[
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "system", label: "System default" },
      ]}
      value={theme || "system"}
      onValueChange={(value) => setTheme(value)}
    />
  );
}
