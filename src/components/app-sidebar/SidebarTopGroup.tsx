import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { LayoutDashboardIcon } from "lucide-react";

export default function SidebarTopGroup() {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setOpenMobile(false)}
            asChild
            size="lg"
            className="text-base [&>svg]:size-5"
          >
            <Link href="/app/dashboard">
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setOpenMobile(false)}
            asChild
            size="lg"
            className="text-base [&>svg]:size-5"
          >
            <Link href="/app/dashboard">
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
