import { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";
import getAllPosts from "@/lib/blog/getAllPosts";

// Allow scheduled posts to go live without redeploy.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest articles about cognitive training and brain development",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog",
    description:
      "Latest articles about cognitive training and brain development",
    url: "/blog",
    siteName: "Cogniba",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cogniba - Scientific Brain Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Latest articles about cognitive training and brain development",
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
