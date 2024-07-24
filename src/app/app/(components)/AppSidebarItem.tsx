import OptionalLinkWrapper from "@/components/OptionalLinkWrapper";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface AppSidebarItemProps {
  href?: string;
  text?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  isExpanded?: boolean;
}

export default function AppSidebarItem({
  text = "",
  Icon,
  onClick,
  href,
  isExpanded,
}: AppSidebarItemProps) {
  const pathname = usePathname();

  return (
    <OptionalLinkWrapper href={href}>
      <div className="w-full">
        <button
          className={cn(
            "group/item: relative flex h-12 w-full items-center justify-center rounded-md text-slate-700 transition duration-200 hover:bg-slate-100 hover:text-slate-950 hover:shadow-sm group-data-[state=expanded]:w-full group-data-[state=expanded]:justify-start",
            pathname === href &&
              "bg-slate-200 text-slate-950 shadow-sm hover:bg-slate-200",
          )}
          aria-current={isExpanded}
          onClick={onClick}
        >
          <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
            <Icon className="h-5 w-5" />
          </div>
          <div
            className="absolute left-9 text-left text-base font-medium opacity-0 transition-[opacity,left] group-data-[state=expanded]:left-11 group-data-[state=expanded]:opacity-100"
            aria-hidden={isExpanded || undefined}
          >
            {text}
          </div>
        </button>
      </div>
    </OptionalLinkWrapper>
  );
}
