import Link from "next/link";
import LogoIcon from "./svg/LogoIcon";
import { cn } from "@/lib/cn";

interface CognibaLogoProps {
  className?: string;
}

export default function CognibaLogo({ className }: CognibaLogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <LogoIcon className="text-2xl" />
      <span className="text-xl font-bold text-primary">Cogniba</span>
    </Link>
  );
}
