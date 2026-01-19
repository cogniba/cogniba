"use client";

import { format } from "date-fns";
import type { PostType } from "@/types/blog";

type BlogPostHeaderProps = {
  post: PostType;
};

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="mb-2 text-3xl font-bold">{post.frontmatter.title}</h1>
      <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-2 text-sm">
        <time dateTime={post.frontmatter.date}>
          {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
        </time>
        {post.frontmatter.updatedAt && (
          <span>
            · Updated{" "}
            <time dateTime={post.frontmatter.updatedAt}>
              {format(new Date(post.frontmatter.updatedAt), "MMMM d, yyyy")}
            </time>
          </span>
        )}
        <span>· {post.frontmatter.readingTime} min read</span>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <div>
          <p className="font-medium">{post.frontmatter.author}</p>
          {post.frontmatter.role && (
            <p className="text-muted-foreground text-sm">
              {post.frontmatter.role}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
