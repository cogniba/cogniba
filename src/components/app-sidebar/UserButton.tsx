import { useTransition } from "react";
import { CircleUserIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";
import LoaderWrapper from "../LoaderWrapper";

interface UserButtonProps {
  full_name: string;
  email: string;
}

export default function UserButton({ full_name, email }: UserButtonProps) {
  const { isExpanded, isUserDropdownOpen, setIsUserDropdownOpen } =
    useSidebar();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      const response = await fetch("/api/auth/sign-out", { method: "POST" });
      if (response.ok) {
        router.replace(process.env.NEXT_PUBLIC_SITE_URL!);
      }
    });
  };

  return (
    <DropdownMenu
      open={isUserDropdownOpen}
      onOpenChange={(open) => setIsUserDropdownOpen(open)}
    >
      <DropdownMenuTrigger asChild>
        <div className="w-full">
          <button
            className={cn(
              "group/item relative flex h-12 w-full items-center justify-center rounded-md text-secondary-foreground transition duration-200 hover:bg-secondary hover:shadow-sm group-data-[state=expanded]:w-full group-data-[state=expanded]:justify-start",
              isUserDropdownOpen && "bg-secondary",
            )}
          >
            <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full">
                <CircleUserIcon className="h-6 w-6 text-secondary-foreground transition duration-200" />
              </div>
            </div>
            <div
              className="absolute left-9 w-40 space-y-0.5 text-left text-base font-medium opacity-0 transition-[opacity,left] group-data-[state=expanded]:left-11 group-data-[state=expanded]:opacity-100"
              aria-hidden={isExpanded || isUserDropdownOpen || undefined}
            >
              <div className="truncate font-medium">{full_name}</div>
              <div className="truncate text-xs font-normal text-muted-foreground transition duration-200">
                {email}
              </div>
            </div>
          </button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[var(--radix-popper-anchor-width)] xs:w-64"
        align="start"
        asChild
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="font-medium"
            disabled={isPending}
            onClick={handleSignOut}
            onSelect={(e) => e.preventDefault()}
          >
            <LoaderWrapper loading={isPending}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <div>Sign Out</div>
            </LoaderWrapper>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
