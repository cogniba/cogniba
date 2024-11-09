import styles from "./BackgroundGlow.module.css";

interface BackgroundGlowProps {
  glowColors: string[];
  animationDuration?: string;
  glowSize?: string;
}

export default function BackgroundGlow({
  glowColors,
  animationDuration = "10s",
  glowSize = "10rem",
}: BackgroundGlowProps) {
  return (
    <span
      className={styles.backgroundGlow}
      style={
        {
          "--glow-colors": glowColors.join(", "),
          "--animation-duration": animationDuration,
          "--glow-size": glowSize,
        } as React.CSSProperties
      }
      aria-hidden="true"
    ></span>
  );
}
