import type { AnchorHTMLAttributes } from "react";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function Anchor(props: AnchorProps) {
  return (
    <a
      {...props}
      className="text-primary underline underline-offset-2 hover:text-primary/80"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  );
}
