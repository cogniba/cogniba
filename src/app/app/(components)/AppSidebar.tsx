import { CogIcon } from "lucide-react";
import AppSidebarItem from "./AppSidebarItem";
import SignOutButton from "./SignOutButton";

export default function AppSidebar() {
  return (
    <aside className="absolute h-full w-20 bg-slate-900 text-white">
      <div className="flex h-full flex-col items-center justify-between">
        <div>
          <AppSidebarItem Icon={CogIcon} />
          <AppSidebarItem Icon={CogIcon} />
          <AppSidebarItem Icon={CogIcon} />
          <AppSidebarItem Icon={CogIcon} />
          <AppSidebarItem Icon={CogIcon} />
        </div>
        <div>
          <AppSidebarItem Icon={CogIcon} href="/app/settings" />
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
