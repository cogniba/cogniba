import getEnv from "@/lib/env";

export function getCanonicalUrl(): URL {
  const siteUrl = new URL(getEnv("NEXT_PUBLIC_SITE_URL"));
  return siteUrl.host.startsWith("www.")
    ? new URL(`https://${siteUrl.host.replace(/^www\./, "")}`)
    : siteUrl;
}
