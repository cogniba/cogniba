export default function createUrl(pathname: string) {
  const isAppSubdomain = pathname.startsWith("/app");
  const formattedPathname = isAppSubdomain
    ? pathname.replace(/^\/app/, "") || "/"
    : pathname;
  const baseUrl = isAppSubdomain
    ? process.env.NEXT_PUBLIC_APP_URL!
    : process.env.NEXT_PUBLIC_SITE_URL!;

  return new URL(formattedPathname, baseUrl);
}
