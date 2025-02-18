import Image from "next/image";

export const MDXComponents = {
  h1: ({ ...props }) => (
    <h1 className="mb-4 mt-8 text-3xl font-bold" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2 className="mb-4 mt-8 text-2xl font-bold" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="mb-4 mt-8 text-xl font-bold" {...props} />
  ),
  h4: ({ ...props }) => (
    <h4 className="mb-4 mt-8 text-lg font-bold" {...props} />
  ),
  p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: ({ ...props }) => (
    <ul className="mb-4 list-inside list-disc space-y-2" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="mb-4 list-inside list-decimal space-y-2" {...props} />
  ),
  li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
  blockquote: ({ ...props }) => (
    <blockquote
      className="my-4 border-l-4 border-gray-300 pl-4 dark:border-gray-700"
      {...props}
    />
  ),
  a: ({ ...props }) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,
  img: ({ alt, src, ...props }: { alt?: string; src?: string }) => (
    <Image
      alt={alt || "Blog image"}
      src={src || ""}
      className="rounded-lg"
      width={800}
      height={400}
      {...props}
    />
  ),
  pre: ({ ...props }) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-900"
      {...props}
    />
  ),
  code: ({ ...props }) => (
    <code
      className="rounded-md bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-900"
      {...props}
    />
  ),
};

export default MDXComponents;
