"use client";

import { Button } from "@/components/ui/button";
import { TwitterIcon, LinkedinIcon } from "lucide-react";

interface BlogPostFooterProps {
  title: string;
  slug: string;
}

export default function BlogPostFooter({ title, slug }: BlogPostFooterProps) {
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

  return (
    <div className="mt-8 flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={shareOnTwitter}
      >
        <TwitterIcon className="h-4 w-4" />
        Share on Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={shareOnLinkedIn}
      >
        <LinkedinIcon className="h-4 w-4" />
        Share on LinkedIn
      </Button>
    </div>
  );
}