import Link from "next/link";

interface OptionalLinkWrapperProps {
  children: React.ReactNode;
  href?: string;
}

export default function OptionalLink({
  children,
  href,
}: OptionalLinkWrapperProps) {
  return (
    <>
      {href ? (
        <Link className="w-full" href={href}>
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
