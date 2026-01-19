import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export function h1({ className, ...props }: HeadingProps) {
  return (
    <h1
      {...props}
      className={cn("blog-heading mt-8 mb-4 text-3xl font-bold", className)}
    />
  );
}

export function h2({ className, ...props }: HeadingProps) {
  return (
    <h2
      {...props}
      className={cn("blog-heading mt-8 mb-4 text-2xl font-bold", className)}
    />
  );
}

export function h3({ className, ...props }: HeadingProps) {
  return (
    <h3
      {...props}
      className={cn("blog-heading mt-6 mb-3 text-xl font-bold", className)}
    />
  );
}

export function h4({ className, ...props }: HeadingProps) {
  return (
    <h4
      {...props}
      className={cn("blog-heading mt-6 mb-2 text-lg font-bold", className)}
    />
  );
}
