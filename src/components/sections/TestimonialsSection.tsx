"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslations } from "next-intl";

const TESTIMONIALS_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format"
];

export default function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS_IMAGES.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS_IMAGES.length - 1 ? 0 : c + 1));

  return (
    <section
      className="relative py-24 md:py-32 bg-charcoal-900 overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* Dynamic Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
           key={current}
           className="absolute inset-0"
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 0.15, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }}
           exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <Image 
            src={TESTIMONIALS_IMAGES[current]}
            alt="Testimonial background"
            fill
            unoptimized
            className="object-cover grayscale mix-blend-overlay"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/80 to-charcoal-900/40" />

      <div className="container mx-auto relative z-10 px-6">
        <AnimatedSection className="mb-16">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            className="text-white"
            light
          />
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
              className="text-center"
            >
              <Quote
                size={40}
                className="text-warm-500 mx-auto mb-10 opacity-50"
                aria-hidden="true"
              />
              <p className="text-white text-2xl md:text-4xl leading-snug lg:leading-normal font-display mb-10 drop-shadow-md">
                &ldquo;{t(`list.${current}.quote` as any)}&rdquo;
              </p>
              
              {/* Profile Image / Info */}
              <div className="flex flex-col items-center">
                 <div className="w-16 h-16 relative rounded-full overflow-hidden mb-4 border-2 border-warm-500/30">
                   <Image 
                     src={TESTIMONIALS_IMAGES[current]}
                     alt={t(`list.${current}.author` as any)}
                     fill
                     unoptimized
                     className="object-cover"
                     sizes="64px"
                   />
                 </div>
                 <footer>
                   <p className="text-cream-100 font-medium tracking-wide text-lg">{t(`list.${current}.author` as any)}</p>
                   <p className="text-warm-300 text-sm mt-1 uppercase tracking-widest font-mono">{t(`list.${current}.role` as any)}</p>
                 </footer>
              </div>
            </motion.blockquote>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-16 pb-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-4 border border-warm-600/40 text-warm-300 hover:border-warm-500 hover:text-white hover:bg-warm-500/10 transition-all duration-300 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS_IMAGES.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className="p-2 transition-all duration-300 group"
                >
                  <div className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-warm-500 w-8" : "bg-warm-600/40 w-2 group-hover:bg-warm-500/50"
                  }`} />
                </button>
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-4 border border-warm-600/40 text-warm-300 hover:border-warm-500 hover:text-white hover:bg-warm-500/10 transition-all duration-300 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
