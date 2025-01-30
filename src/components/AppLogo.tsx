import { cn } from "@/lib/utils";
import { AtomIcon } from "lucide-react";

interface AppLogoProps {
  className?: string;
}

export default function AppLogo({ className }: AppLogoProps) {
  return (
    <span
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 text-primary",
        className,
      )}
    >
      <AtomIcon className="text-2xl" />
      <span className="text-xl font-bold">Wemplate</span>
    </span>
  );
}
