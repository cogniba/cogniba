import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export default function getPostBySlug(slug: string) {
  const postsDirectory = join(process.cwd(), "src/content/blog");

  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data,
    content,
  };
}
