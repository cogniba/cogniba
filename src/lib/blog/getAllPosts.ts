import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostType } from "@/types/blog";
import blogConfig from "@/config/blogConfig";

export interface GetAllPostsOptions {
  includeFuture?: boolean;
  now?: Date;
}

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

function defaultIncludeFuture(): boolean {
  // On Vercel preview deployments it's useful to see scheduled posts.
  // On production, future-dated posts are hidden until their publish date.
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV !== "production";
  }

  return process.env.NODE_ENV !== "production";
}

export default function getAllPosts(
  options: GetAllPostsOptions = {},
): PostType[] {
  const { postsDirectory } = blogConfig;
  const now = options.now ?? new Date();
  const includeFuture = options.includeFuture ?? defaultIncludeFuture();

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

      const post: PostType = {
        slug,
        frontmatter,
        content,
      };

      const isFuture = parsedDate.getTime() > now.getTime();
      if (!includeFuture && isFuture) {
        return null;
      }

      return post;
    })
    .filter((post): post is PostType => post !== null)

    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );

  return posts;
}
