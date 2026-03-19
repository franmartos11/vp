"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroReveal, fadeInUp, staggerFast } from "@/lib/animations";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <motion.div
        variants={heroReveal}
        initial="hidden"
        animate="visible"
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=2000&auto=format&fit=crop"
          alt="Luxury modern architecture — Vertex Build Group"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
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
            className="eyebrow text-warm-300 mb-6"
          >
            Architecture · Construction · Design
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-display-2xl font-display text-cream-100 leading-none mb-8 text-balance"
          >
            Building spaces that outlast trends.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-warm-300 text-lg max-w-lg leading-relaxed mb-10"
          >
            Luxury architecture and construction across the United States.
            From concept to completion — with precision.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Link href="/portfolio" className="btn-primary bg-cream-100 text-charcoal-900 hover:bg-cream-200">
              View our work <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn-outline border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900">
              Start a project
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeInUp}
          className="absolute bottom-0 right-0 flex items-center gap-3 text-warm-400"
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <span className="w-px h-12 bg-warm-400 block" />
        </motion.div>
      </div>
    </section>
  );
}
