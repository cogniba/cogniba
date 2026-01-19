import { compileMDX } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/blog/mdx/MDXComponents";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export default async function mdxToHtml(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
    components: MDXComponents,
  });

  return content;
}
