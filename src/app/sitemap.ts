import type { MetadataRoute } from "next";
import getAllPosts from "@/lib/blog/getAllPosts";
import { getCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const canonicalUrl = getCanonicalUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: canonicalUrl.toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${canonicalUrl.toString()}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${canonicalUrl.toString()}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${canonicalUrl.toString()}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${canonicalUrl.toString()}/research`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const posts = getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => !post.frontmatter.noindex && !post.frontmatter.draft)
    .map((post) => ({
      url: `${canonicalUrl.toString()}/blog/${post.slug}`,
      lastModified: post.frontmatter.updatedAt ?? post.frontmatter.date,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...blogRoutes];
}
