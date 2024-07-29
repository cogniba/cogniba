import { useEffect, useState } from "react";
import { CircleUserIcon, LogOutIcon } from "lucide-react";
import getUser from "@/database/queries/users/getUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import handleSignOut from "@/server-actions/auth/handleSignOut";
import { useSidebar } from "@/context/SidebarContext";

export default function UserButton() {
  const { isExpanded, isUserDropdownOpen, setIsUserDropdownOpen } =
    useSidebar();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleName = async () => {
      const { name, username } = await getUser();

      setName(name);
      setUserName(username);
    };

    handleName();
  }, []);

  return (
    <DropdownMenu
      open={isUserDropdownOpen}
      onOpenChange={(open) => setIsUserDropdownOpen(open)}
    >
      <DropdownMenuTrigger asChild>
        <div className="w-full">
          <button
            className={cn(
              "group/item relative flex h-12 w-full items-center justify-center rounded-md text-slate-700 transition duration-200 hover:bg-slate-100 hover:text-slate-950 hover:shadow-sm group-data-[state=expanded]:w-full group-data-[state=expanded]:justify-start",
              isUserDropdownOpen && "bg-slate-100",
            )}
          >
            <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50">
                <CircleUserIcon className="h-6 w-6 text-slate-800 transition duration-200" />
              </div>
            </div>
            <div
              className="absolute left-9 w-40 space-y-0.5 text-left text-base font-medium opacity-0 transition-[opacity,left] group-data-[state=expanded]:left-11 group-data-[state=expanded]:opacity-100"
              aria-hidden={isExpanded || isUserDropdownOpen || undefined}
            >
              <div className="truncate font-semibold">{name}</div>
              <div className="truncate text-xs font-normal text-slate-600 group-hover/item:text-slate-700">
                @{userName}
              </div>
            </div>
          </button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="font-medium text-slate-700 transition duration-200 hover:text-slate-950"
            onClick={() => handleSignOut()}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            <div>Sign Out</div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
