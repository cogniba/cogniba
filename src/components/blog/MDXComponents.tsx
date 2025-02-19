import Image from "next/image";
import { createElement, ComponentProps, FC } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4";

const createHeadingComponent = (
  level: number,
): FC<ComponentProps<HeadingTag>> => {
  const HeadingComponent = ({ ...props }: ComponentProps<HeadingTag>) => {
    const Tag = `h${level}` as HeadingTag;
    const id = props.children
      ?.toString()
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");

    return createElement(
      Tag,
      {
        ...props,
        id,
        className: `group mb-4 mt-8 text-${level === 1 ? "3xl" : level === 2 ? "2xl" : level === 3 ? "xl" : "lg"} font-bold`,
      },
      [
        createElement("span", { key: "text" }, props.children),
        createElement(
          "a",
          {
            key: "anchor",
            href: `#${id}`,
            className:
              "ml-2 opacity-0 hover:opacity-100 hover:underline group-hover:opacity-100 text-primary",
            "aria-label": `Link to ${props.children}`,
          },
          "#",
        ),
      ],
    );
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
};

const Paragraph = ({ ...props }) => (
  <p className="mb-4 leading-relaxed" {...props} />
);
Paragraph.displayName = "Paragraph";

const UnorderedList = ({ ...props }) => (
  <ul className="mb-4 list-inside list-disc space-y-2" {...props} />
);
UnorderedList.displayName = "UnorderedList";

const OrderedList = ({ ...props }) => (
  <ol className="mb-4 list-inside list-decimal space-y-2" {...props} />
);
OrderedList.displayName = "OrderedList";

const ListItem = ({ ...props }) => (
  <li className="leading-relaxed" {...props} />
);
ListItem.displayName = "ListItem";

const Blockquote = ({ ...props }) => (
  <blockquote
    className="my-4 border-l-4 border-gray-300 pl-4 dark:border-gray-700"
    {...props}
  />
);
Blockquote.displayName = "Blockquote";

const Anchor = ({ ...props }) => (
  <a className="text-primary hover:underline" {...props} />
);
Anchor.displayName = "Anchor";

const HorizontalRule = () => (
  <hr className="my-8 border-gray-200 dark:border-gray-800" />
);
HorizontalRule.displayName = "HorizontalRule";

const ImageComponent = ({
  alt,
  src,
  ...props
}: {
  alt?: string;
  src?: string;
}) => (
  <Image
    alt={alt || "Blog image"}
    src={src || ""}
    className="rounded-lg"
    width={800}
    height={400}
    {...props}
  />
);
ImageComponent.displayName = "ImageComponent";

const PreBlock = ({ ...props }) => (
  <pre
    className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-900"
    {...props}
  />
);
PreBlock.displayName = "PreBlock";

const CodeBlock = ({ ...props }) => (
  <code
    className="rounded-md bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-900"
    {...props}
  />
);
CodeBlock.displayName = "CodeBlock";

export const MDXComponents = {
  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
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
