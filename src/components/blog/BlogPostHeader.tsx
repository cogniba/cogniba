"use client";

import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ClockIcon } from "lucide-react";
import calculateReadingTime from "@/lib/calculateReadingTime";
import { Post } from "contentlayer/generated";

interface BlogPostHeaderProps {
  post: Post;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <div>
      <div className="mb-4">
        <p className="font-medium text-primary">Blog</p>
      </div>
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
        <p className="mb-6 text-lg text-muted-foreground">{post.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {post.author
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase() || "CB"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-sm text-muted-foreground">{post.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {format(new Date(post.date), "MMMM dd, yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {calculateReadingTime(post.body.raw)} min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
