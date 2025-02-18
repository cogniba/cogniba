"use client";

import { Post } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@/components/blog/MDXComponents";
import BlogPostHeader from "./BlogPostHeader";
import BlogPostImage from "./BlogPostImage";
import BlogPostFooter from "./BlogPostFooter";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const Content = getMDXComponent(post.body.code);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <article className="prose prose-gray dark:prose-invert mx-auto">
        <BlogPostHeader post={post} />
        <BlogPostImage src={post.image} alt={post.title} />
        <Content components={MDXComponents} />
        <BlogPostFooter title={post.title} slug={post.slug} />
      </article>
    </div>
  );
}
