import { SidebarProvider } from "@/context/SidebarContext";
import AppHeader from "./(components)/AppHeader";
import AppSidebar from "./(components)/AppSidebar";

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col">
        {/* <AppHeader /> */}
        <div className="relative flex h-full w-full">
          <AppSidebar />
          <main className="h-full w-full bg-teal-50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
