import { cn } from "@/lib/cn";

type GlowProps = {
  children: React.ReactNode;
  display?: string;
  className?: string;
  glowSize?: string;
  glowOpacity?: number;
};

export default function Glow({
  children,
  display = "inline-block",
  className,
  glowSize = "64px",
  glowOpacity = 50,
}: GlowProps) {
  return (
    <span className={cn("relative", className)} style={{ display }}>
      {children}
      <span
        className={cn("absolute inset-0 -z-10 size-full", className)}
        style={{ filter: `blur(${glowSize})`, opacity: glowOpacity / 100 }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
