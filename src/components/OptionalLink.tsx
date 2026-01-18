import Link from "next/link";

type OptionalLinkProps = {
  children: React.ReactNode;
  href?: string;
}

export default function OptionalLink({ children, href }: OptionalLinkProps) {
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
