import { h1, h2, h3, h4 } from "./mdx/Heading";
import { Paragraph, Blockquote, HorizontalRule } from "./mdx/Typography";
import { UnorderedList, OrderedList, ListItem } from "./mdx/Lists";
import { Anchor } from "./mdx/Links";
import { ImageComponent } from "./mdx/Image";
import { PreBlock, CodeBlock } from "./mdx/Code";

export const MDXComponents = {
  h1,
  h2,
  h3,
  h4,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  a: Anchor,
  hr: HorizontalRule,
  img: ImageComponent,
  pre: PreBlock,
  code: CodeBlock,
};

export default MDXComponents;
