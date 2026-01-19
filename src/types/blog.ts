export type PostType = {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    updatedAt?: string;
    image: string;
    ogImage?: string;
    author: string;
    role: string;
    tags: string[];
    readingTime: number;
    wordCount: number;
    canonicalUrl?: string;
    noindex?: boolean;
    draft?: boolean;
  };
  content: string;
};
