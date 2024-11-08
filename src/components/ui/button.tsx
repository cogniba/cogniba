"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        custom: "",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface NormalButtonProps {
  animatedBorder?: false;
  borderColors?: never;
  borderWidth?: never;
  animationDuration?: never;
}

interface FancyButtonProps {
  animatedBorder: true;
  borderColors: string[];
  borderWidth?: string;
  animationDuration?: string;
}

export type ButtonProps = BaseButtonProps &
  (NormalButtonProps | FancyButtonProps);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      animatedBorder = false,
      borderColors,
      borderWidth = "0.125rem",
      animationDuration = "2s",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <>
        <Comp
          className={cn(
            "animated-border relative",
            buttonVariants({ variant, size, className }),
          )}
          ref={ref}
          {...props}
        />
        {animatedBorder && borderColors && (
          <style jsx>{`
            @property --angle {
              syntax: "<angle>";
              initial-value: 0deg;
              inherits: false;
            }

            .animated-border {
              background-color: red;
            }

            .animated-border::before,
            .animated-border::after {
              --angle: 0deg;

              content: "";
              box-sizing: content-box;
              position: absolute;
              height: 100%;
              width: 100%;
              top: 50%;
              left: 50%;
              translate: -50% -50%;
              z-index: -1;
              padding: ${borderWidth};
              border-radius: inherit;
              background-image: conic-gradient(
                from var(--angle),
                ${borderColors.join(", ")}
              );
              animation: ${animationDuration} spin linear infinite;
            }

            .animated-border::before {
              filter: blur(1.5rem);
              opacity: 0.5;
            }

            @keyframes spin {
              from {
                --angle: 0deg;
              }
              to {
                --angle: 360deg;
              }
            }
          `}</style>
        )}
      </>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
