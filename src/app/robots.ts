import type { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const canonicalUrl = getCanonicalUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/app", "/app/", "/api", "/api/", "/app/*", "/api/*"],
    },
    sitemap: `${canonicalUrl.toString()}/sitemap.xml`,
    host: canonicalUrl.toString(),
  };
}
