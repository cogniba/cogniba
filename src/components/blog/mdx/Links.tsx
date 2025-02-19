import { ComponentProps } from "react";

export const Anchor = ({ ...props }: ComponentProps<"a">) => (
  <a className="text-primary hover:underline" {...props} />
);
Anchor.displayName = "Anchor";