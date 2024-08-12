import { cn } from "@/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const emphasizeVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "dark:text-slate-50 text-slate-950",
      orange: "dark:text-orange-400 text-orange-600",
      teal: "dark:text-teal-400 text-teal-600",
      red: "dark:text-red-400 text-red-600",
      green: "dark:text-green-400 text-green-600",
      yellow: "dark:text-yellow-400 text-yellow-600",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export interface EmphasizeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof emphasizeVariants> {
  asChild?: boolean;
}

const Emphasize = React.forwardRef<HTMLElement, EmphasizeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <em
        className={cn(emphasizeVariants({ variant, className }))}
        ref={ref}
        {...props}
      ></em>
    );
  },
);
Emphasize.displayName = "Emphasize";

export { Emphasize };
