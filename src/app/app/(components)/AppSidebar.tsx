"use client";

import { AreaChartIcon, PlayIcon, SettingsIcon } from "lucide-react";
import AppSidebarItem from "./AppSidebarItem";
import UserButton from "./UserButton";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/cn";

export default function AppSidebar() {
  const { isVisible, isExpanded, setIsExpanded, isUserDropdownOpen } =
    useSidebar();

  return (
    <nav
      className={cn(
        "hide-scrollbar group pointer-events-auto fixed z-50 flex h-full w-16 flex-col items-center justify-between overflow-y-auto border-r border-slate-200 bg-white py-2 text-white shadow-xl shadow-black/5 transition-all duration-200 data-[state=expanded]:w-60 data-[state=expanded]:shadow-black/10",
        !isVisible && "-translate-x-full transition duration-300",
      )}
      data-state={isExpanded || isUserDropdownOpen ? "expanded" : "collapsed"}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex w-full flex-col items-center justify-center gap-y-1 p-2">
        <AppSidebarItem href="/app/play" text="Play" Icon={PlayIcon} />
        <AppSidebarItem
          href="/app/analytics"
          text="Analytics"
          Icon={AreaChartIcon}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-y-1 p-2">
        <AppSidebarItem
          href="/app/settings"
          text="Settings"
          Icon={SettingsIcon}
        />
        <UserButton />
      </div>
    </nav>
  );
}
