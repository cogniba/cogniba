import AppHeader from "@/components/app-header/AppHeader";
import AppSidebar from "@/components/app-sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AuthContextProvider from "@/context/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AuthContextProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          {children}
        </SidebarInset>
      </AuthContextProvider>
    </SidebarProvider>
  );
}
