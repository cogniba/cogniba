import AppSidebar from "./(components)/AppSidebar";

import { SidebarProvider } from "@/context/SidebarContext";

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      {/* <FullScreenProvider /> */}
      <SidebarProvider>
        <div className="flex flex-col">
          {/* <AppHeader /> */}
          <div className="relative flex h-full w-full">
            <AppSidebar full_name={user.full_name} email={user.email} />
            <main className="lg:can-hover:pl-16 min-h-screen w-full bg-teal-50 dark:bg-slate-950">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
