import type { HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export function h1(props: HeadingProps) {
  return (
    <h1 {...props} className="blog-heading mt-8 mb-4 text-3xl font-bold" />
  );
}

export function h2(props: HeadingProps) {
  return (
    <h2 {...props} className="blog-heading mt-8 mb-4 text-2xl font-bold" />
  );
}

export function h3(props: HeadingProps) {
  return <h3 {...props} className="blog-heading mt-6 mb-3 text-xl font-bold" />;
}

export function h4(props: HeadingProps) {
  return <h4 {...props} className="blog-heading mt-6 mb-2 text-lg font-bold" />;
}
