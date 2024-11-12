import { cn } from "@/lib/cn";
import styles from "@/styles/modules/BackgroundGlow.module.css";

interface BackgroundGlowProps {
  glowColors: string[];
  animationDuration?: string;
  glowSize?: string;
  zIndex?: number;
  className?: string;
}

export default function BackgroundGlow({
  glowColors,
  animationDuration = "10s",
  glowSize = "10rem",
  zIndex = -1,
  className,
}: BackgroundGlowProps) {
  return (
    <span
      className={cn(className, styles.backgroundGlow)}
      style={
        {
          "--glow-colors": glowColors.join(", "),
          "--animation-duration": animationDuration,
          "--glow-size": glowSize,
          "--z-index": zIndex,
        } as React.CSSProperties
      }
      aria-hidden="true"
    ></span>
  );
}
