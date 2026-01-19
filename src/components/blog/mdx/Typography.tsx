import type { HTMLAttributes } from "react";

type TypographyProps = HTMLAttributes<HTMLElement>;

export function Paragraph(props: TypographyProps) {
  return <p {...props} className="mb-4 leading-relaxed" />;
}

export function Blockquote(props: TypographyProps) {
  return (
    <blockquote
      {...props}
      className="border-primary/30 text-muted-foreground mb-4 border-l-4 pl-4 italic"
    />
  );
}

export function HorizontalRule(props: HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className="border-muted my-8" />;
}
