"use client";

import SettingsItem from "@/components/settings/SettingsItem";

export default function ChangePasswordSetting() {
  return (
    <SettingsItem
      title="Change password"
      description="Change your password"
      type="button"
      buttonText="Change password"
      href="/app/settings/change-password"
    />
  );
}
