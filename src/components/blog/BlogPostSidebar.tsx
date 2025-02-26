"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPostSidebarProps {
  title: string;
  slug: string;
  tags: string[];
  headings: { text: string; level: number }[];
}

export default function BlogPostSidebar({
  title,
  slug,
  tags,
  headings,
}: BlogPostSidebarProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold">Share this article</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: title,
                  url: `${window.location.origin}/blog/${slug}`,
                });
              } else {
                navigator.clipboard.writeText(
                  `${window.location.origin}/blog/${slug}`,
                );
              }
            }}
          >
            Share
          </Button>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {headings.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Table of Contents</h3>
          <nav className="space-y-1 text-sm">
            {headings.map((heading, index) => (
              <a
                key={index}
                href={`#${heading.text
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .trim()
                  .replace(/\s+/g, "-")
                  .replace(/-+/g, "-")}`}
                className={`block transition-colors hover:text-foreground ${
                  heading.level === 2
                    ? "text-foreground"
                    : "pl-4 text-muted-foreground"
                }`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
