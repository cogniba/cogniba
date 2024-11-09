"use client";

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
    <>
      <span className="background-glow"></span>
      <style jsx>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        .background-glow::after {
          content: "";
          position: absolute;
          height: 100%;
          width: 100%;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          z-index: -1;
          background-image: conic-gradient(
            from var(--angle),
            ${glowColors.join(", ")}
          );
          animation: ${animationDuration} spin linear infinite;
          filter: blur(${glowSize});
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
