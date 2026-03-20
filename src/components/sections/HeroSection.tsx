"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroReveal, fadeInUp, staggerFast } from "@/lib/animations";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-end pb-20 md:pb-28 overflow-hidden bg-charcoal-900"
      aria-label="Hero"
    >
      {/* Cinematic Video Background with Parallax */}
      <motion.div
        style={{ y, opacity }}
        variants={heroReveal}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 w-full h-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-80"
          src="https://cdn.coverr.co/videos/coverr-architecture-and-clouds-1629/1080p.mp4"
          poster="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=2000&auto=format&fit=crop"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-charcoal-900/10" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs tracking-widest uppercase text-warm-400 mb-6 font-mono"
          >
            Architecture · Construction · Design
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-display-2xl font-display text-white leading-none mb-8 text-balance drop-shadow-2xl"
          >
            Building spaces that outlast trends.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-warm-300 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light"
          >
            Luxury architecture and construction across the United States.
            From concept to completion — with absolute precision.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Link href="/portfolio" className="btn-primary bg-white text-charcoal-900 hover:bg-warm-100 transition-colors uppercase tracking-widest text-sm font-semibold">
              View our work <ArrowRight size={14} className="ml-2 inline-block" />
            </Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-charcoal-900 transition-colors uppercase tracking-widest text-sm font-semibold">
              Start a project
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-6 right-6 flex flex-col items-center gap-2 text-warm-400"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-widest uppercase writing-vertical font-mono">Scroll</span>
          <span className="w-px h-12 bg-white/30 block relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-1/2 bg-warm-400 animate-pulse" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
