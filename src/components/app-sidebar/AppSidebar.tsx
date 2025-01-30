"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import SidebarUser from "./SidebarUser";
import SidebarTopGroup from "./SidebarTopGroup";
import SidebarBottomGroup from "./SidebarBottomGroup";
import SidebarLogo from "./SidebarLogo";

export default function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarTopGroup />
        <SidebarBottomGroup />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}
