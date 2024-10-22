import AppHeader from "./(components)/AppHeader";
import AppSidebar from "./(components)/AppSidebar";
import getSessionUser from "@/database/queries/users/getSessionUser";

import { SidebarProvider } from "@/context/SidebarContext";
import FullScreenProvider from "../../components/FullScreenProvider";
import { createClient } from "@/lib/supabase/server";

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;

  return (
    <>
      {/* <FullScreenProvider /> */}
      <SidebarProvider>
        <div className="flex flex-col">
          {/* <AppHeader /> */}
          <div className="relative flex h-full w-full">
            <AppSidebar name={name} username={username} />
            <main className="lg:can-hover:pl-16 min-h-screen w-full bg-teal-50 dark:bg-slate-950">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
