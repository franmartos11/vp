"use client";

import { motion } from "framer-motion";

export function InfiniteMarquee() {
  const words = [
    "STRUCTURAL ENGINEERING", "•", "MEP COORDINATION", "•", "BUILDING RECERTIFICATIONS", "•", "STRUCTURAL INSPECTIONS", "•",
    "STRUCTURAL ENGINEERING", "•", "MEP COORDINATION", "•", "BUILDING RECERTIFICATIONS", "•", "STRUCTURAL INSPECTIONS", "•",
    "STRUCTURAL ENGINEERING", "•", "MEP COORDINATION", "•", "BUILDING RECERTIFICATIONS", "•", "STRUCTURAL INSPECTIONS", "•"
  ];

  return (
    <div className="w-full bg-charcoal-900 border-y border-brand-blue/15 flex items-center overflow-hidden py-4 select-none relative z-20 shadow-xl">
      <motion.div
        className="flex whitespace-nowrap w-max"
        animate={{ x: [0, "-33.333333%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {words.map((word, idx) => (
          <span 
             key={idx} 
             className={`inline-block px-4 text-xs md:text-sm lg:text-[13px] font-mono tracking-[0.2em] font-light ${word === '•' ? 'text-brand-blue' : 'text-warm-200'}`}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
