"use client";

import { useEffect, useState } from "react";
import BlogPostHeader from "./BlogPostHeader";
import BlogPostImage from "./BlogPostImage";
import BlogPostSidebar from "./BlogPostSidebar";
import { PostType } from "@/types/blog";

interface BlogPostProps {
  post: PostType;
  content: React.ReactNode;
}

export default function BlogPost({ post, content }: BlogPostProps) {
  const [headings, setHeadings] = useState<{ text: string; level: number }[]>(
    [],
  );

  useEffect(() => {
    const extractHeadings = () => {
      const articleElement = document.querySelector("article");
      if (!articleElement) return;

      const headingElements = articleElement.querySelectorAll(".blog-heading");
      const headingsData = Array.from(headingElements).map((heading) => {
        const text = (heading.textContent?.trim() || "").replace(/#$/, "");
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

        heading.id = id;
        return {
          text,
          level: parseInt(heading.tagName.slice(1)),
        };
      });

      setHeadings(headingsData);
    };

    extractHeadings();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <article className="prose prose-gray dark:prose-invert lg:max-w-3xl">
          <BlogPostHeader post={post} />
          <BlogPostImage
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
          />
          {content}
        </article>
        <div className="lg:w-72 lg:flex-shrink-0">
          <div className="sticky top-20">
            <BlogPostSidebar
              title={post.frontmatter.title}
              slug={post.slug}
              tags={post.frontmatter.tags}
              headings={headings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
