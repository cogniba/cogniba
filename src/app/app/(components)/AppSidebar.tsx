"use client";

import { PlayIcon, SettingsIcon } from "lucide-react";
import AppSidebarItem from "./AppSidebarItem";
import SignOutButton from "./SignOutButton";

export default function AppSidebar() {
  return (
    <aside className="pointer-events-auto absolute z-50 h-full w-16 border-r border-slate-200 bg-white text-white shadow-xl shadow-black/5">
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center justify-center gap-y-1 p-2">
          <AppSidebarItem Icon={PlayIcon} href="/app/play" />
          <AppSidebarItem Icon={SettingsIcon} />
          <AppSidebarItem Icon={SettingsIcon} />
          <AppSidebarItem Icon={SettingsIcon} />
          <AppSidebarItem Icon={SettingsIcon} />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-y-1 p-2">
          <AppSidebarItem Icon={SettingsIcon} href="/app/settings" />
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
