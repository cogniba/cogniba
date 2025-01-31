"use client";

// import Logo from "@/public/logo.svg";
import Logo from "@/public/logo.svg";

interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className }: LogoIconProps) {
  return (
    <div className={className}>
      <Logo />
    </div>
  );
}
