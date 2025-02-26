import { compileMDX } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/blog/mdx/MDXComponents";

export default async function mdxToHtml(source: string) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
    components: MDXComponents,
  });

  return content;
}
