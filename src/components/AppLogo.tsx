import LogoIcon from "./svg/LogoIcon";
import { cn } from "@/lib/cn";

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
      <LogoIcon className="text-2xl" />
      <span className="text-xl font-bold">Cogniba</span>
    </span>
  );
}
