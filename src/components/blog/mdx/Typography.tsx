import { ComponentProps } from "react";

export const Paragraph = ({ ...props }: ComponentProps<"p">) => (
  <p className="mb-4 leading-relaxed" {...props} />
);
Paragraph.displayName = "Paragraph";

export const Blockquote = ({ ...props }: ComponentProps<"blockquote">) => (
  <blockquote
    className="my-4 border-l-4 border-gray-300 pl-4 dark:border-gray-700"
    {...props}
  />
);
Blockquote.displayName = "Blockquote";

export const HorizontalRule = () => (
  <hr className="my-8 border-gray-200 dark:border-gray-800" />
);
HorizontalRule.displayName = "HorizontalRule";