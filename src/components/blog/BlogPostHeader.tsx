"use client";

import { format } from "date-fns";
import { PostType } from "@/types/blog";

interface BlogPostHeaderProps {
  post: PostType;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold">{post.frontmatter.title}</h1>
      <div className="mb-4 text-sm text-muted-foreground">
        <time>{format(new Date(post.frontmatter.date), "MMMM d, yyyy")}</time>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <div>
          <p className="font-medium">{post.frontmatter.author}</p>
          <p className="text-sm text-muted-foreground">
            {post.frontmatter.role}
          </p>
        </div>
      </div>
    </div>
  );
}
