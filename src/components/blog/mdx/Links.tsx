import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function Anchor({ className, ...props }: AnchorProps) {
  return (
    <a
      {...props}
      className={cn(
        "text-primary hover:text-primary/80 underline underline-offset-2",
        className,
      )}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  );
}
