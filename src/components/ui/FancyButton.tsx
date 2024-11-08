"use client";

import { cn } from "@/lib/cn";
import { Button, type ButtonProps } from "./button";

interface FancyButtonProps extends ButtonProps {
  children: React.ReactNode;
  borderColors: string[];
  borderWidth?: string;
  animationDuration?: string;
}

export default function FancyButton({
  children,
  borderColors,
  borderWidth = "0.125rem",
  animationDuration = "2s",
  className,
  variant,
  size,
  ...props
}: FancyButtonProps) {
  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={cn("animated-border relative", className)}
        {...props}
      >
        {children}
      </Button>
      <style jsx global>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        .animated-border::before,
        .animated-border::after {
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
    </>
  );
}
