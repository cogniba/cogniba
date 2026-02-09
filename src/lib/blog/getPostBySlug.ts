import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostType } from "@/types/blog";
import blogConfig from "@/config/blogConfig";

function parseFrontmatterDate(value: unknown): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return new Date();
}

export default function getPostBySlug(slug: string): PostType | null {
  const { postsDirectory } = blogConfig;

  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const parsedDate = parseFrontmatterDate(data.date);

    const frontmatter = {
      title: data.title || "",
      description: data.description || "",
      date: parsedDate.toISOString(),
      image: data.image || "/images/blog/default.jpg",
      author: data.author || "Cogniba Team",
      role: data.role || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
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
