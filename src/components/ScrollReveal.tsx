import { type ReactNode } from "react";
import { useDesktopMotion } from "../hooks/useDesktopMotion";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const desktop = useDesktopMotion();
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced || !desktop ? false : { opacity: 1, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: desktop ? 0.25 : 0,
        delay: desktop ? Math.min(delay, 0.05) : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
