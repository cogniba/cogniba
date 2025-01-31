"use client";

import Logo from "@/public/logo.svg";
import Image from "next/image";

interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className }: LogoIconProps) {
  return (
    <div className={className}>
      <Image src={Logo} alt="Logo" />
    </div>
  );
}
