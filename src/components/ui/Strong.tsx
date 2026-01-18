import * as React from "react";

import { cn } from "@/lib/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const strongVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      link: "text-link hover:underline underline-offset-4",
      teal: "dark:text-teal-400 text-teal-600",
      red: "dark:text-red-400 text-red-600",
      green: "dark:text-green-400 text-green-600",
      yellow: "dark:text-yellow-500 text-yellow-600",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export type StrongProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement> & VariantProps<typeof strongVariants>

const Strong = React.forwardRef<HTMLElement, StrongProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <strong
        className={cn(strongVariants({ variant, className }))}
        ref={ref}
        {...props}
      ></strong>
    );
  },
);
Strong.displayName = "Strong";

export { Strong };
