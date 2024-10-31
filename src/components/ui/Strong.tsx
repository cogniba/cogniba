import * as React from "react";

import { cn } from "@/lib/cn";
import { cva, VariantProps } from "class-variance-authority";

const strongVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      orange: "dark:text-orange-400 text-orange-600",
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

export interface StrongProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof strongVariants> {
  asChild?: boolean;
}

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
