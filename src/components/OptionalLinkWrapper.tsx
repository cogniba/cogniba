import Link from "next/link";

interface OptionalLinkWrapperProps {
  children: React.ReactNode;
  href?: string;
}

export default function OptionalLinkWrapper({
  children,
  href,
}: OptionalLinkWrapperProps) {
  return <>{href ? <Link href={href}>{children}</Link> : <>{children}</>}</>;
}
