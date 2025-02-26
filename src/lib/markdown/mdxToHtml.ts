import { compileMDX } from "next-mdx-remote/rsc";

export default async function mdxToHtml(source: string) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return content;
}
