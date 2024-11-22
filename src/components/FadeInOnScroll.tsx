import * as motion from "motion/react-client";

interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function FadeInOnScroll({
  children,
  delay = 0,
  duration = 0.5,
  from = "top",
  className,
}: FadeInOnScrollProps) {
  const initialPosition = (() => {
    if (from === "top") {
      return { y: -25 };
    } else if (from === "bottom") {
      return { y: 25 };
    } else if (from === "left") {
      return { x: -25 };
    } else if (from === "right") {
      return { x: 25 };
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)", ...initialPosition }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      transition={{ ease: "easeOut", duration, delay }}
      viewport={{ once: true, amount: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
