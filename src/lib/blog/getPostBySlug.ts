import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostType } from "@/types/blog";
import blogConfig from "@/config/blogConfig";

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
        : "/images/blog/default.jpg";
    const author =
      typeof rawFrontmatter["author"] === "string"
        ? rawFrontmatter["author"]
        : "Cogniba Team";
    const role =
      typeof rawFrontmatter["role"] === "string" ? rawFrontmatter["role"] : "";
    const tags = Array.isArray(rawFrontmatter["tags"])
      ? rawFrontmatter["tags"].filter(
          (tag): tag is string => typeof tag === "string",
        )
      : [];

    const frontmatter = {
      title,
      description,
      date: dateValue
        ? new Date(dateValue).toISOString()
        : new Date().toISOString(),
      image,
      author,
      role,
      tags,
    };

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
