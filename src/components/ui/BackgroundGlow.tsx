import styles from "@/styles/BackgroundGlow.module.css";

interface BackgroundGlowProps {
  glowColors: string[];
  animationDuration?: string;
  glowSize?: string;
  zIndex?: number;
}

export default function BackgroundGlow({
  glowColors,
  animationDuration = "10s",
  glowSize = "10rem",
  zIndex = -1,
}: BackgroundGlowProps) {
  return (
    <span
      className={styles.backgroundGlow}
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
