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
    const element = document.getElementById(
      text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-"),
    );
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
              <button
                key={heading.text}
                onClick={() => scrollToHeading(heading.text)}
                className={`block w-full text-left text-sm hover:text-primary ${heading.level === 2 ? "font-medium" : "pl-4 text-muted-foreground"}`}
              >
                {heading.text}
              </button>
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
