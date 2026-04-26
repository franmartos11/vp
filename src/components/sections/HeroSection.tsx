"use client";

import { useRef } from "react";
import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroReveal, fadeInUp, staggerFast } from "@/lib/animations";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("Hero");
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
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-charcoal-900/10" />
        {/* Cinematic Film Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </motion.div>

      <div className="container mx-auto relative z-10 px-6 md:px-0">
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <p className="inline-block text-[10px] sm:text-xs tracking-widest uppercase text-white bg-black/40 backdrop-blur-md px-4 py-2 border border-white/20 rounded-sm font-mono shadow-xl">
              {t("eyebrow")}
            </p>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] lg:text-[7rem] font-display text-white leading-[0.9] mb-8 drop-shadow-2xl flex flex-wrap gap-x-3 gap-y-1 md:gap-x-4 md:gap-y-2">
            {[t("headline_building"), t("headline_spaces"), t("headline_that"), t("headline_outlast"), t("headline_trends")].map((word, i) => (
              <span key={i} className="block relative">
                <motion.span
                  initial={{ y: "50%", rotate: 2, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block origin-bottom-left"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            variants={fadeInUp}
            className="text-warm-300 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light"
          >
            {t("description")}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link href="/portfolio" className="btn-primary bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors uppercase tracking-widest text-sm font-semibold">
              {t("view_work")} <ArrowRight size={14} className="ml-2 inline-block" />
            </Link>
            <Link href="/contact" className="btn-outline border-white/60 text-white hover:bg-brand-blue/20 hover:border-white transition-colors uppercase tracking-widest text-sm font-semibold">
              {t("start_project")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-6 right-6 hidden md:flex flex-col items-center gap-2 text-warm-400"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-widest uppercase writing-vertical font-mono">{t("scroll")}</span>
          <span className="w-px h-12 bg-white/30 block relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-1/2 bg-warm-400 animate-pulse" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
