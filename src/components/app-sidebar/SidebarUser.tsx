"use client";

import {
  BadgeCheckIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  LogOutIcon,
  SparklesIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { useTransition } from "react";
import createClient from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import createCustomerPortal from "@/actions/stripe/createCustomerPortal";
import { useAuthContext } from "@/context/AuthContext";
import getFreePlan from "@/lib/stripe/getFreePlan";
import redirectToError from "@/actions/redirectToError";
import { cn } from "@/lib/cn";
import { Badge } from "../ui/badge";
import { usePostHog } from "posthog-js/react";

export default function SidebarUser() {
  const posthog = usePostHog();
  const { status, fullName, email, subscriptionType } = useAuthContext();
  const [isLoggingOut, startLoggingOut] = useTransition();
  const [isOpeningCustomerPortal, startOpeningCustomerPortal] = useTransition();

  const { isMobile, setOpenMobile } = useSidebar();
  const router = useRouter();

  const { freePlan, error } = getFreePlan();
  if (error || !freePlan) {
    return redirectToError("Failed to open customer portal");
  }

  const isLoading = status === "loading" || !fullName || !email;
  const isDisabled = isLoading || isLoggingOut || isOpeningCustomerPortal;

  const handleCustomerPortal = () => {
    startOpeningCustomerPortal(() => {
      void (async () => {
        const { url, error } = await createCustomerPortal({
          return_url: window.location.href,
        });

        if (error || !url) {
          return redirectToError("Failed to open customer portal");
        }

        window.location.href = url;
      })();
    });
  };

  const handleLogOut = () => {
    startLoggingOut(() => {
      void (async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.replace("/sign-in");
      })();
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn(isLoading && "bg-foreground/10 animate-pulse")}
            >
              {!isLoading && (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {fullName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{fullName}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                  <ChevronsUpDownIcon className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className={cn("p-0 font-normal")}>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {subscriptionType !== freePlan.name && (
                  <Badge className="absolute top-0 right-0 m-1.5 px-1.5 py-0">
                    Pro
                  </Badge>
                )}
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {fullName?.substring(0, 2) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{fullName}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {subscriptionType === freePlan.name && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpenMobile(false);
                      void posthog.capture("upgrade_link_click", {
                        source: "sidebar_user",
                      });
                    }}
                    asChild
                    disabled={isDisabled}
                  >
                    <Link href="/app/upgrade">
                      <SparklesIcon />
                      Upgrade to Pro
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  setOpenMobile(false);
                }}
                asChild
                disabled={isDisabled}
              >
                <Link href={"/app/settings"}>
                  <BadgeCheckIcon />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  void posthog.capture("billing_link_click", {
                    source: "sidebar_user",
                  });
                  setOpenMobile(false);
                  handleCustomerPortal();
                }}
                disabled={isDisabled}
              >
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  setOpenMobile(false);
                  handleLogOut();
                }}
                disabled={isDisabled}
              >
                <LogOutIcon />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
