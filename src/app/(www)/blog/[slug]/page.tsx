import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPost from "@/components/blog/BlogPost";
import getAllPosts from "@/lib/blog/getAllPosts";
import getPostBySlug from "@/lib/blog/getPostBySlug";
import mdxToHtml from "@/lib/markdown/mdxToHtml";
import { getCanonicalUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getAllPosts().filter((post) => !post.frontmatter.draft);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;

  const post = getPostBySlug(awaitedParams.slug);

  if (!post) return {};

  const canonicalUrl = getCanonicalUrl();
  const absoluteUrl = new URL(`/blog/${post.slug}`, canonicalUrl).toString();
  const ogImage = post.frontmatter.ogImage ?? post.frontmatter.image;
  const isIndexable = !post.frontmatter.noindex && !post.frontmatter.draft;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags,
    authors: [{ name: post.frontmatter.author }],
    alternates: {
      canonical: post.frontmatter.canonicalUrl ?? absoluteUrl,
    },
    robots: {
      index: isIndexable,
      follow: isIndexable,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      url: absoluteUrl,
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updatedAt ?? post.frontmatter.date,
      authors: [post.frontmatter.author],
      tags: post.frontmatter.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const awaitedParams = await params;

  const post = getPostBySlug(awaitedParams.slug);

  if (!post) notFound();

  const content = await mdxToHtml(post.content);
  const canonicalUrl = getCanonicalUrl();
  const absoluteUrl = new URL(`/blog/${post.slug}`, canonicalUrl).toString();
  const ogImage = post.frontmatter.ogImage ?? post.frontmatter.image;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: [ogImage],
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updatedAt ?? post.frontmatter.date,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
      jobTitle: post.frontmatter.role || undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Cogniba",
      logo: {
        "@type": "ImageObject",
        url: `${canonicalUrl.toString()}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.frontmatter.canonicalUrl ?? absoluteUrl,
    },
    keywords: post.frontmatter.tags.join(", "),
    wordCount: post.frontmatter.wordCount,
  };

  return (
    <>
      <BlogPost post={post} content={content} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}

export const revalidate = 86400;
