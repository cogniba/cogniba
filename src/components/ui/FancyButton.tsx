import { cn } from "@/lib/cn";
import { Button, type ButtonProps } from "./button";

import styles from "@/styles/modules/AnimatedBorder.module.css";

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
        className={cn("relative", className, styles.animatedBorder)}
        style={
          {
            "--border-width": borderWidth,
            "--border-colors": borderColors.join(", "),
            "--animation-duration": animationDuration,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </Button>
    </>
  );
}
