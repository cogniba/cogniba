import OptionalLinkWrapper from "@/components/OptionalLinkWrapper";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface AppSidebarItemProps {
  text?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  href?: string;
}

export default function AppSidebarItem({
  text = "",
  Icon,
  onClick,
  href,
}: AppSidebarItemProps) {
  const pathname = usePathname();

  return (
    <OptionalLinkWrapper href={href}>
      <button
        className={cn(
          "flex aspect-square h-full w-full items-center justify-center rounded-lg text-slate-700 transition duration-200 hover:bg-slate-100 hover:text-slate-950",
          pathname === href && "bg-slate-200",
        )}
        onClick={onClick}
      >
        <Icon
          className={cn("h-5 w-5", pathname === href && "text-slate-950")}
        />
        <div>{text}</div>
      </button>
    </OptionalLinkWrapper>
  );
}
