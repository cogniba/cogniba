import { ComponentProps, FC } from "react";
import { cn } from "@/lib/cn";

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

    return (
      <Tag
        {...props}
        id={id}
        className={cn(
          "group mb-4 mt-8 scroll-mt-20 font-bold blog-heading",
          level === 1 && "text-3xl",
          level === 2 && "text-2xl",
          level === 3 && "text-xl",
          level === 4 && "text-lg",
        )}
      >
        <span key="text">{props.children}</span>
        <a
          key="anchor"
          href={`#${id}`}
          className="ml-2 text-primary opacity-0 hover:underline hover:opacity-100 group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(id || "");
            if (element) {
              window.history.pushState({}, "", `#${id}`);
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          aria-label={`Link to ${props.children}`}
        >
          #
        </a>
      </Tag>
    );
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
};

export const h1 = createHeadingComponent(1);
export const h2 = createHeadingComponent(2);
export const h3 = createHeadingComponent(3);
export const h4 = createHeadingComponent(4);