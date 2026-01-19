export type PostType = {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    image: string;
    author: string;
    role: string;
    tags: string[];
  };
  content: string;
};
