import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostType } from "@/types/blog";
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
        typeof rawFrontmatter["role"] === "string"
          ? rawFrontmatter["role"]
          : "";
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
    })

    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );

  return posts;
}
