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

    const frontmatter = {
      title: data["title"] || "",
      description: data["description"] || "",
      date: data["date"]
        ? new Date(data["date"]).toISOString()
        : new Date().toISOString(),
      image: data["image"] || "/images/blog/default.jpg",
      author: data["author"] || "Cogniba Team",
      role: data["role"] || "",
      tags: Array.isArray(data["tags"]) ? data["tags"] : [],
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
