"use client";

import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
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
import { CreditCardIcon, HelpCircleIcon } from "lucide-react";
import Link from "next/link";

export default function MobileHeader() {
  const { setOpenMobile } = useSidebar();

  return (
    <>
      <div className="fixed left-0 top-0 h-16 px-2 py-2">
        <SidebarTrigger className="size-10 [&_svg]:size-6" />
      </div>

      <Sidebar>
        <SidebarHeader>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setOpenMobile(false)}
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
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setOpenMobile(false)}
                  size="lg"
                  asChild
                  className="text-base [&>svg]:size-5"
                >
                  <Link href="/pricing">
                    <CreditCardIcon />
                    <span>Pricing</span>
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
                  <Link href="/faq">
                    <HelpCircleIcon />
                    <span>FAQ</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <Link href="/sign-in" onClick={() => setOpenMobile(false)}>
                  <Button variant="secondary" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/sign-up" onClick={() => setOpenMobile(false)}>
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
