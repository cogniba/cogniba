import { Post } from "contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
    >
      {post.image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {post.description}
        </p>
        <time className="text-sm text-muted-foreground">
          {format(new Date(post.date), "MMMM dd, yyyy")}
        </time>
      </div>
    </Link>
  );
}
