"use client";

import { AreaChartIcon, PlayIcon, SettingsIcon } from "lucide-react";
import AppSidebarItem from "./AppSidebarItem";
import SignOutButton from "./SignOutButton";
import { useState } from "react";

export default function AppSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav
      className="transition-width hide-scrollbar group pointer-events-auto absolute z-50 flex h-full w-16 flex-col items-center justify-between overflow-y-auto border-r border-slate-200 bg-white py-2 text-white shadow-xl shadow-black/5 duration-200 data-[state=expanded]:w-56 data-[state=expanded]:shadow-black/10"
      data-state={isExpanded ? "expanded" : "collapsed"}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex w-full flex-col items-center justify-center gap-y-1 p-2">
        <AppSidebarItem
          href="/app/play"
          text="Play"
          Icon={PlayIcon}
          isExpanded={isExpanded}
        />
        <AppSidebarItem
          href="/app/analytics"
          text="Analytics"
          Icon={AreaChartIcon}
          isExpanded={isExpanded}
        />
        <AppSidebarItem Icon={SettingsIcon} />
        <AppSidebarItem Icon={SettingsIcon} />
        <AppSidebarItem Icon={SettingsIcon} />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-y-1 p-2">
        <AppSidebarItem
          href="/app/settings"
          text="Settings"
          Icon={SettingsIcon}
          isExpanded={isExpanded}
        />
        <SignOutButton />
      </div>
    </nav>
  );
}
