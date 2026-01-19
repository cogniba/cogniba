import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPost from "@/components/blog/BlogPost";
import getAllPosts from "@/lib/blog/getAllPosts";
import getPostBySlug from "@/lib/blog/getPostBySlug";
import mdxToHtml from "@/lib/markdown/mdxToHtml";
import getEnv from "@/lib/env";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;

  const post = getPostBySlug(awaitedParams.slug);

  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | Cogniba Blog`,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      url: `${getEnv("NEXT_PUBLIC_SITE_URL")}/blog/${post.slug}`,
      images: [
        {
          url: post.frontmatter.image,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const awaitedParams = await params;

  const post = getPostBySlug(awaitedParams.slug);

  if (!post) notFound();

  const content = await mdxToHtml(post.content);

  return <BlogPost post={post} content={content} />;
}
