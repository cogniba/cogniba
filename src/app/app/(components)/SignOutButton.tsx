"use client";

import handleSignOut from "@/server-actions/auth/handleSignOut";
import AppSidebarItem from "./AppSidebarItem";
import { LogOutIcon } from "lucide-react";

export default function SignOutButton() {
  return <AppSidebarItem Icon={LogOutIcon} onClick={() => handleSignOut()} />;
}
