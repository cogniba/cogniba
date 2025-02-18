import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Metadata } from "next";
import MDXComponents from "@/components/blog/MDXComponents";

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

  const Content = getMDXComponent(post.body.code);

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
        <time className="text-sm text-muted-foreground">
          {format(new Date(post.date), "MMMM dd, yyyy")}
        </time>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <Content components={MDXComponents} />
      </div>
    </article>
  );
}
