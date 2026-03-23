"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

export function ParallaxSeparator() {
  const t = useTranslations("ParallaxSeparator");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-charcoal-900 flex items-center justify-center">
      <motion.div 
         className="absolute inset-0 w-full h-[140%] -top-[20%]"
         style={{ y }}
      >
        <Image
          src="https://images.unsplash.com/photo-1510257007550-618e59add57b?w=1600&auto=format"
          alt="Architectural concrete detail"
          fill
          unoptimized
          className="object-cover grayscale"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-charcoal-900/60 mix-blend-multiply" />
      
      <div className="relative z-10 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-display text-white italic drop-shadow-2xl leading-tight">
          "{t('quote')}"
        </h2>
        <div className="w-12 h-px bg-warm-500 mx-auto mt-8 mb-6" />
        <p className="text-warm-300 font-mono tracking-widest text-xs uppercase">{t('caption')}</p>
      </div>
    </section>
  );
}
