"use client";

import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import navigationConfig from "@/config/landing-page/navigationConfig";

export default function MobileHeader() {
  const { setOpenMobile } = useSidebar();
  const { navigationItems } = navigationConfig;

  return (
    <>
      <div className="fixed top-0 z-50 h-16 w-full max-w-6xl px-4 pt-2">
        <NavigationMenu className="border-muted bg-muted/70 flex h-full w-full max-w-full items-center justify-between rounded-2xl border px-6 shadow-xl backdrop-blur">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <AppLogo />
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <SidebarTrigger className="size-10 [&_svg]:size-6" />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <Sidebar>
        <SidebarHeader>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                  asChild
                  size="lg"
                >
                  <Link href="/">
                    <AppLogo />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarGroup className="my-auto">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => {
                      setOpenMobile(false);
                    }}
                    asChild
                    size="lg"
                    className="text-base [&>svg]:size-5"
                  >
                    <Link href={item.href}>
                      <item.Icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <Link
                  href="/sign-in"
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                >
                  <Button variant="secondary" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/sign-up"
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                >
                  <Button className="w-full">Get Started</Button>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
