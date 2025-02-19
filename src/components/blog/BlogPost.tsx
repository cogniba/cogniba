"use client";

import { Post } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@/components/blog/MDXComponents";
import BlogPostHeader from "./BlogPostHeader";
import BlogPostImage from "./BlogPostImage";
import BlogPostSidebar from "./BlogPostSidebar";
import { useEffect, useState } from "react";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const Content = getMDXComponent(post.body.code);
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
      console.log(headingsData);
      setHeadings(headingsData);
    };

    extractHeadings();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <article className="prose prose-gray dark:prose-invert lg:max-w-3xl">
          <BlogPostHeader post={post} />
          <BlogPostImage src={post.image} alt={post.title} />
          <Content components={MDXComponents} />
        </article>
        <div className="lg:w-72 lg:flex-shrink-0">
          <div className="sticky top-20">
            <BlogPostSidebar
              title={post.title}
              slug={post.slug}
              tags={post.tags}
              headings={headings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
