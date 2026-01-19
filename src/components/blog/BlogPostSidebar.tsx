"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

type BlogPostSidebarProps = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  headings: { id: string; text: string; level: number }[];
};

export default function BlogPostSidebar({
  title,
  slug,
  description,
  tags,
  headings,
}: BlogPostSidebarProps) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const handleHeadingClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    headingId: string,
  ) => {
    e.preventDefault();

    const element = document.getElementById(headingId);
    if (element) {
      const headerHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      });

      history.pushState(null, "", `#${headingId}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold">Share this article</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const url = `${window.location.origin}/blog/${slug}`;
              if (typeof navigator.share === "function") {
                void navigator.share({
                  title: title,
                  text: description,
                  url,
                });
              } else {
                void navigator.clipboard.writeText(url);
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
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  handleHeadingClick(e, heading.id);
                }}
                className={cn(
                  "hover:text-foreground block transition-colors",
                  heading.level === 2
                    ? "text-foreground"
                    : "text-muted-foreground pl-4",
                )}
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
