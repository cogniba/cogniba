import { SidebarProvider } from "@/context/SidebarContext";
import AppHeader from "./(components)/AppHeader";
import AppSidebar from "./(components)/AppSidebar";
import getUser from "@/database/queries/users/getUser";

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const { username, name } = await getUser();

  return (
    <SidebarProvider>
      <div className="flex flex-col">
        {/* <AppHeader /> */}
        <div className="relative flex h-full w-full">
          <AppSidebar name={name} username={username} />
          <main className="min-h-screen w-full bg-teal-50 pl-16 dark:bg-slate-950">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
