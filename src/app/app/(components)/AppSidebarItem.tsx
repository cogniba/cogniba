import OptionalLinkWrapper from "@/components/OptionalLinkWrapper";
import Link from "next/link";

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
  return (
    <div className="h-20 bg-yellow-500 p-1.5">
      <OptionalLinkWrapper href={href}>
        <button
          className="flex h-full items-start justify-center rounded-lg bg-blue-500 p-5"
          onClick={onClick}
        >
          <Icon className="h-full w-full" />
          <div>{text}</div>
        </button>
      </OptionalLinkWrapper>
    </div>
  );
}
