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
import { cn } from "../../lib/utils";
import createClient from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import createCustomerPortal from "@/actions/stripe/createCustomerPortal";
import { useAuthContext } from "@/context/AuthContext";

export default function SidebarUser() {
  const { status, fullName, email } = useAuthContext();
  const [isLoggingOut, startLoggingOut] = useTransition();
  const [isOpeningCustomerPortal, startOpeningCustomerPortal] = useTransition();

  const { isMobile, setOpenMobile } = useSidebar();
  const router = useRouter();

  const isLoading = status === "loading" || !fullName || !email;
  const isDisabled = isLoading || isLoggingOut || isOpeningCustomerPortal;

  const handleCustomerPortal = () => {
    startOpeningCustomerPortal(async () => {
      const { url, error } = await createCustomerPortal({
        return_url: window.location.href,
      });

      if (error || !url) {
        const error = new Error("Failed to open customer portal");
        console.error(error);

        const errorUrl = new URL("/error", origin);
        errorUrl.searchParams.set("message", error.message);
        router.push(errorUrl.toString());
        return;
      }

      window.location.href = url;
    });
  };

  const handleLogOut = async () => {
    startLoggingOut(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.replace("/sign-in");
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn(isLoading && "animate-pulse bg-foreground/10")}
            >
              {!isLoading && (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {fullName.substring(0, 2) ?? "U"}
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

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setOpenMobile(false)}
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

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setOpenMobile(false)}
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
