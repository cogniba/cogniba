import { HTMLAttributes } from "react";

type TypographyProps = HTMLAttributes<HTMLElement>;

export function Paragraph(props: TypographyProps) {
  return <p {...props} className="mb-4 leading-relaxed" />;
}

export function Blockquote(props: TypographyProps) {
  return (
    <blockquote
      {...props}
      className="mb-4 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
    />
  );
}

export function HorizontalRule(props: HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className="my-8 border-muted" />;
}
