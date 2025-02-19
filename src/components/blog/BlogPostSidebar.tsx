"use client";

import { Button } from "@/components/ui/button";
import { TwitterIcon, LinkedinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPostSidebarProps {
  title: string;
  slug: string;
  tags?: string[];
  headings?: { text: string; level: number }[];
}

export default function BlogPostSidebar({
  title,
  slug,
  tags = [],
  headings = [],
}: BlogPostSidebarProps) {
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      )}`,
      "_blank",
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      )}`,
      "_blank",
    );
  };

  const scrollToHeading = (text: string) => {
    const id = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="space-y-8">
      {tags.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {headings.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Table of Contents</h3>
          <nav className="space-y-2">
            {headings.map((heading) => (
              <a
                key={heading.text}
                href={`#${heading.text
                  .toLowerCase()
                  .replace(/[^\w\s]/g, "")
                  .replace(/\s+/g, "-")}`}
                className={`block w-full text-left text-sm hover:text-primary ${heading.level === 2 ? "font-medium" : "pl-4 text-muted-foreground"}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(heading.text);
                }}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      <div>
        <h3 className="mb-4 text-lg font-semibold">Share</h3>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2"
            onClick={shareOnTwitter}
          >
            <TwitterIcon className="h-4 w-4" />
            Share on Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2"
            onClick={shareOnLinkedIn}
          >
            <LinkedinIcon className="h-4 w-4" />
            Share on LinkedIn
          </Button>
        </div>
      </div>
    </aside>
  );
}
