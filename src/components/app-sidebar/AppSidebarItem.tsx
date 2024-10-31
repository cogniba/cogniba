import OptionalLink from "@/components/OptionalLink";

import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";

interface AppSidebarItemProps {
  href?: string;
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export default function AppSidebarItem({
  text = "",
  Icon,
  onClick,
  href,
}: AppSidebarItemProps) {
  const pathname = usePathname();
  const { isExpanded, isUserDropdownOpen } = useSidebar();

  return (
    <OptionalLink href={href}>
      <div className="w-full">
        <button
          className={cn(
            "group/item relative flex h-12 w-full items-center justify-center rounded-md text-muted-foreground transition duration-200 hover:bg-secondary hover:text-secondary-foreground hover:shadow-sm group-data-[state=expanded]:w-full group-data-[state=expanded]:justify-start",
            pathname === href &&
              "bg-secondary text-secondary-foreground shadow-sm",
          )}
          onClick={onClick}
        >
          <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
            <Icon className="h-5 w-5" />
          </div>
          <div
            className="absolute left-9 min-w-32 text-left text-base font-medium opacity-0 transition-[opacity,left] group-data-[state=expanded]:left-11 group-data-[state=expanded]:opacity-100"
            aria-hidden={isExpanded || isUserDropdownOpen || undefined}
          >
            {text}
          </div>
        </button>
      </div>
    </OptionalLink>
  );
}
