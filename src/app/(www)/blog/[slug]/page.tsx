import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogPost from "@/components/blog/BlogPost";
import getAllPosts from "@/lib/blog/getAllPosts";
import getPostBySlug from "@/lib/blog/getPostBySlug";
import mdxToHtml from "@/lib/markdown/mdxToHtml";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;
  const post = getPostBySlug(awaitedParams.slug);

  if (!post) return {};

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://cogniba.com"}/blog/${post.slug}`;
  const ogImage = post.frontmatter.image;

  return {
    title: `${post.frontmatter.title} | Cogniba Blog`,
    description: post.frontmatter.description,
    authors: [{ name: post.frontmatter.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      url: url,
      publishedTime: post.frontmatter.date,
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cogniba.com";

  // JSON-LD for the article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image.startsWith("http")
      ? post.frontmatter.image
      : `${siteUrl}${post.frontmatter.image}`,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Cogniba",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`, // Assuming a logo exists, or fallback
      },
    },
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPost post={post} content={content} />
    </>
  );
}
