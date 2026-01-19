import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { MessageSquarePlusIcon, SettingsIcon } from "lucide-react";

export default function SidebarBottomGroup() {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup className="mt-auto">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => {
              setOpenMobile(false);
            }}
            asChild
            size="lg"
            className="text-base [&>svg]:size-5"
          >
            <Link href="/app/feedback">
              <MessageSquarePlusIcon />
              <span>Feedback</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => {
              setOpenMobile(false);
            }}
            asChild
            size="lg"
            className="text-base [&>svg]:size-5"
          >
            <Link href="/app/settings">
              <SettingsIcon />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
