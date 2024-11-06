import Link from "next/link";
import LogoIcon from "./svg/LogoIcon";

export default function CognibaLogo() {
  return (
    <Link href="/" className="flex items-center justify-center gap-2">
      <LogoIcon className="text-2xl" />
      <span className="text-xl font-bold text-primary">Cogniba</span>
    </Link>
  );
}
