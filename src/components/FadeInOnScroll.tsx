import * as motion from "motion/react-client";

interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export default function FadeInOnScroll({
  children,
  delay = 0,
  duration = 0.8,
}: FadeInOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ ease: "easeOut", duration, delay }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
