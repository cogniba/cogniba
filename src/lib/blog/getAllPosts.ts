import getPostBySlug from "./getPostBySlug";
import getPostSlugs from "./getPostSlugs";

export default function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) =>
      new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date)
        ? -1
        : 1,
    );

  return posts;
}
