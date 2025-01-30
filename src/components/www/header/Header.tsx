import { SidebarProvider } from "@/components/ui/sidebar";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="flex h-svh flex-col items-center">
      <SidebarProvider className="flex flex-col items-center">
        <div className="hidden flex-col items-center md:flex">
          <DesktopHeader />
        </div>
        <div className="flex flex-col items-center md:hidden">
          <MobileHeader />
        </div>

        <main className="flex w-full flex-1 pt-16">{children}</main>
      </SidebarProvider>
    </div>
  );
}
