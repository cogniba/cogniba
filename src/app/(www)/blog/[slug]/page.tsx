import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogPost from "@/components/blog/BlogPost";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;

  const post = allPosts.find((post) => post.slug === awaitedParams.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Cogniba Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const awaitedParams = await params;

  const post = allPosts.find((post) => post.slug === awaitedParams.slug);
  if (!post) notFound();

  return <BlogPost post={post} />;
}
