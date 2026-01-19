import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostType } from "@/types/blog";
import blogConfig from "@/config/blogConfig";
import calculateReadingTime from "@/lib/blog/calculateReadingTime";

export default function getPostBySlug(slug: string): PostType | null {
  const { postsDirectory } = blogConfig;

  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const rawFrontmatter = data as Record<string, unknown>;

    const title =
      typeof rawFrontmatter["title"] === "string"
        ? rawFrontmatter["title"]
        : "";
    const description =
      typeof rawFrontmatter["description"] === "string"
        ? rawFrontmatter["description"]
        : "";
    const dateValue =
      rawFrontmatter["date"] instanceof Date ||
      typeof rawFrontmatter["date"] === "string"
        ? rawFrontmatter["date"]
        : undefined;
    const image =
      typeof rawFrontmatter["image"] === "string"
        ? rawFrontmatter["image"]
        : blogConfig.defaultImage;
    const ogImage =
      typeof rawFrontmatter["ogImage"] === "string"
        ? rawFrontmatter["ogImage"]
        : blogConfig.defaultOgImage;
    const author =
      typeof rawFrontmatter["author"] === "string"
        ? rawFrontmatter["author"]
        : blogConfig.defaultAuthor;
    const role =
      typeof rawFrontmatter["role"] === "string"
        ? rawFrontmatter["role"]
        : blogConfig.defaultRole;
    const tags = Array.isArray(rawFrontmatter["tags"])
      ? rawFrontmatter["tags"].filter(
          (tag): tag is string => typeof tag === "string",
        )
      : [];
    const updatedAtValue =
      rawFrontmatter["updatedAt"] instanceof Date ||
      typeof rawFrontmatter["updatedAt"] === "string"
        ? rawFrontmatter["updatedAt"]
        : undefined;
    const canonicalUrl =
      typeof rawFrontmatter["canonicalUrl"] === "string"
        ? rawFrontmatter["canonicalUrl"]
        : undefined;
    const noindex =
      typeof rawFrontmatter["noindex"] === "boolean"
        ? rawFrontmatter["noindex"]
        : undefined;
    const draft =
      typeof rawFrontmatter["draft"] === "boolean"
        ? rawFrontmatter["draft"]
        : undefined;
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = calculateReadingTime(content);

    const frontmatter: PostType["frontmatter"] = {
      title,
      description,
      date: dateValue
        ? new Date(dateValue).toISOString()
        : new Date().toISOString(),
      image,
      author,
      role,
      tags,
      readingTime,
      wordCount,
    };

    if (updatedAtValue) {
      frontmatter.updatedAt = new Date(updatedAtValue).toISOString();
    }

    if (ogImage) {
      frontmatter.ogImage = ogImage;
    }

    if (canonicalUrl) {
      frontmatter.canonicalUrl = canonicalUrl;
    }

    if (typeof noindex === "boolean") {
      frontmatter.noindex = noindex;
    }

    if (typeof draft === "boolean") {
      frontmatter.draft = draft;
    }

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}
