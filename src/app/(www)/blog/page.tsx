import type { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";
import getAllPosts from "@/lib/blog/getAllPosts";
import { getCanonicalUrl } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const canonicalUrl = getCanonicalUrl();

  return {
    title: "Cogniba Blog",
    description:
      "Evidence-based articles on working memory, n-back training, and brain fitness to help you build cognitive endurance and focus.",
    keywords: [
      "working memory",
      "n-back",
      "brain training",
      "cognitive fitness",
      "neuroplasticity",
    ],
    alternates: {
      canonical: new URL("/blog", canonicalUrl).toString(),
    },
    openGraph: {
      title: "Cogniba Blog",
      description:
        "Evidence-based articles on working memory, n-back training, and brain fitness to help you build cognitive endurance and focus.",
      url: new URL("/blog", canonicalUrl).toString(),
      siteName: "Cogniba",
      type: "website",
      images: [
        {
          url: "/images/blog/cogniba-launch.png",
          width: 1200,
          height: 630,
          alt: "Cogniba Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cogniba Blog",
      description:
        "Evidence-based articles on working memory, n-back training, and brain fitness to help you build cognitive endurance and focus.",
      images: ["/images/blog/cogniba-launch.png"],
    },
  };
}

export default function BlogPage() {
  const posts = getAllPosts().filter(
    (post) => !post.frontmatter.noindex && !post.frontmatter.draft,
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10 space-y-3">
        <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase">
          Cognitive Training Insights
        </p>
        <h1 className="text-3xl font-bold">Cogniba Blog</h1>
        <p className="text-muted-foreground text-lg">
          Evidence-based guides on working memory, n-back training, and brain
          fitness so you can build a sharper, more focused mind.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

export const revalidate = 86400;
