import AppHeader from "./(components)/AppHeader";
import AppSidebar from "./(components)/AppSidebar";
import getSessionUser from "@/database/queries/users/getSessionUser";

import { SidebarProvider } from "@/context/SidebarContext";
import FullScreenProvider from "../../components/FullScreenProvider";

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const { username, name } = await getSessionUser();

  return (
    <>
      {/* <FullScreenProvider /> */}
      <SidebarProvider>
        <div className="flex flex-col">
          {/* <AppHeader /> */}
          <div className="relative flex h-full w-full">
            <AppSidebar name={name} username={username} />
            <main className="min-h-screen w-full bg-teal-50 dark:bg-slate-950 lg:can-hover:pl-16">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
