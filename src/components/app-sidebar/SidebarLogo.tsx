import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import AppLogo from "../AppLogo";

export default function SidebarLogo() {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => { setOpenMobile(false); }}
          asChild
          size="lg"
          className="bg-primary/[0.075] text-base font-medium text-primary hover:bg-primary/15 hover:text-primary active:bg-primary/20 active:text-primary [&>svg]:size-6"
        >
          <Link href="/app">
            <AppLogo />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
