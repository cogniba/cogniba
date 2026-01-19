"use client";

import { useEffect, useState } from "react";
import BlogPostHeader from "./BlogPostHeader";
import BlogPostImage from "./BlogPostImage";
import BlogPostSidebar from "./BlogPostSidebar";
import type { PostType } from "@/types/blog";

type BlogPostProps = {
  post: PostType;
  content: React.ReactNode;
};

export default function BlogPost({ post, content }: BlogPostProps) {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  useEffect(() => {
    const extractHeadings = () => {
      const articleElement = document.querySelector("article");
      if (!articleElement) return;

      const headingElements = articleElement.querySelectorAll(".blog-heading");
      const headingsData = Array.from(headingElements)
        .map((heading) => {
          const rawText = heading.textContent;
          if (!rawText) return null;
          const text = rawText.trim().replace(/#$/, "");
          const existingId = heading.getAttribute("id");
          const id =
            existingId ??
            text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .trim()
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-");

          heading.id = id;
          return {
            id,
            text,
            level: parseInt(heading.tagName.slice(1)),
          };
        })
        .filter(
          (heading): heading is { id: string; text: string; level: number } =>
            Boolean(heading),
        );

      setHeadings(headingsData);
    };

    extractHeadings();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <article
          className="prose prose-gray dark:prose-invert lg:max-w-3xl"
          itemScope
          itemType="https://schema.org/Article"
        >
          <BlogPostHeader post={post} />
          <BlogPostImage
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
          />
          <p className="text-muted-foreground mb-8 text-lg">
            {post.frontmatter.description}
          </p>
          {content}
        </article>
        <div className="lg:w-72 lg:flex-shrink-0">
          <div className="sticky top-20">
            <BlogPostSidebar
              title={post.frontmatter.title}
              slug={post.slug}
              description={post.frontmatter.description}
              tags={post.frontmatter.tags}
              headings={headings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
