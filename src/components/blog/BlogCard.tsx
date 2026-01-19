import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { PostType } from "@/types/blog";

type BlogCardProps = {
  post: PostType;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
        {post.frontmatter.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-4">
          <h2 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
            {post.frontmatter.title}
          </h2>
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
            {post.frontmatter.description}
          </p>
          <time className="text-muted-foreground text-sm">
            {format(new Date(post.frontmatter.date), "MMMM dd, yyyy")}
          </time>
        </CardContent>
      </Card>
    </Link>
  );
}
