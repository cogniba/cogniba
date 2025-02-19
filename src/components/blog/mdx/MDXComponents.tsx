import { h1, h2, h3, h4 } from "./Heading";
import { Paragraph, Blockquote, HorizontalRule } from "./Typography";
import { UnorderedList, OrderedList, ListItem } from "./Lists";
import { Anchor } from "./Links";
import { ImageComponent } from "./Image";
import { PreBlock, CodeBlock } from "./Code";

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
