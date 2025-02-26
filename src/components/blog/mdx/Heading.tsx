import { HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export function h1(props: HeadingProps) {
  return (
    <h1 {...props} className="blog-heading mb-4 mt-8 text-3xl font-bold" />
  );
}

export function h2(props: HeadingProps) {
  return (
    <h2 {...props} className="blog-heading mb-4 mt-8 text-2xl font-bold" />
  );
}

export function h3(props: HeadingProps) {
  return <h3 {...props} className="blog-heading mb-3 mt-6 text-xl font-bold" />;
}

export function h4(props: HeadingProps) {
  return <h4 {...props} className="blog-heading mb-2 mt-6 text-lg font-bold" />;
}
