import { SidebarProvider } from "@/context/SidebarContext";
import AppHeader from "./(components)/AppHeader";
import AppSidebar from "./(components)/AppSidebar";

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col">
        {/* <AppHeader /> */}
        <div className="relative flex h-full w-full">
          <AppSidebar />
          <main className="min-h-screen w-full bg-teal-50 pl-16 dark:bg-slate-950">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
