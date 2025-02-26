import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostType } from "@/types/blog";
import blogConfig from "@/config/blogConfig";

export default function getAllPosts(): PostType[] {
  const { postsDirectory } = blogConfig;

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      const frontmatter = {
        title: data.title || "",
        description: data.description || "",
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
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
    })

    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );

  return posts;
}
