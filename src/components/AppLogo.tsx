import LogoIcon from "./svg/LogoIcon";
import { cn } from "@/lib/cn";

type AppLogoProps = {
  className?: string;
};

export default function AppLogo({ className }: AppLogoProps) {
  return (
    <span
      className={cn(
        "text-primary flex cursor-pointer items-center justify-center gap-2",
        className,
      )}
    >
      <LogoIcon className="text-2xl" />
      <span className="text-xl font-bold">Cogniba</span>
    </span>
  );
}
