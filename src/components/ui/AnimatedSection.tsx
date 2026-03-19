"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportConfig);

  const variants = stagger ? staggerContainer : fadeInUp;

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  );
}
