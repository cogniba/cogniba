import { MetadataRoute } from "next";
import getAllPosts from "@/lib/blog/getAllPosts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cogniba.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const routes = ["", "/pricing", "/research", "/faq", "/blog"].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  return [...routes, ...blogUrls];
}
