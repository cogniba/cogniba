import type { Metadata } from "next";
import AppHeader from "@/components/app-header/AppHeader";
import AppSidebar from "@/components/app-sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AuthContextProvider from "@/context/AuthContext";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthContextProvider>
  );
}
