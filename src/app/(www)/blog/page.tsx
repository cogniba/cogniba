import type { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";
import getAllPosts from "@/lib/blog/getAllPosts";
import getEnv from "@/lib/env";

export const metadata: Metadata = {
  title: "Blog | Cogniba",
  description: "Latest articles about cognitive training and brain development",
  openGraph: {
    title: "Blog | Cogniba",
    description:
      "Latest articles about cognitive training and brain development",
    url: `${getEnv("NEXT_PUBLIC_SITE_URL")}/blog`,
    siteName: "Cogniba",
    type: "website",
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
