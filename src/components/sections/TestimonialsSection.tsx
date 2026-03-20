"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const TESTIMONIALS = [
  {
    quote:
      "Working with this team was unlike any construction experience I've had. Every detail was considered, every deadline met. The final result exceeded our expectations by a wide margin.",
    author: "Jonathan M.",
    role: "Private Residential Client — Miami, FL",
  },
  {
    quote:
      "They took a complex commercial brief and turned it into something that now defines our brand. The design intelligence and on-site execution were both world-class.",
    author: "Sarah K.",
    role: "CEO, Horizon Capital Group — New York, NY",
  },
  {
    quote:
      "From the first conversation to the final walkthrough, the communication was transparent and proactive. That's rare. The craftsmanship is simply exceptional.",
    author: "David L.",
    role: "Real Estate Developer — Charlotte, NC",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section
      className="py-24 md:py-32 bg-charcoal-900"
      aria-label="Client testimonials"
    >
      <div className="container mx-auto">
        <AnimatedSection className="mb-16">
          <SectionHeading
            eyebrow="Testimonials"
            title="What our clients say."
            light
          />
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
              className="text-center"
            >
              <Quote
                size={32}
                className="text-brand-blue mx-auto mb-8 fill-brand-blue"
                aria-hidden="true"
              />
              <p className="text-cream-200 text-xl md:text-2xl leading-relaxed font-display mb-8">
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </p>
              <footer>
                <p className="text-cream-100 font-medium">{TESTIMONIALS[current].author}</p>
                <p className="text-warm-500 text-sm mt-1">{TESTIMONIALS[current].role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2 border border-charcoal-600 text-warm-500 hover:border-brand-blue hover:text-brand-blue transition-colors duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-brand-blue w-6" : "bg-charcoal-600"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-2 border border-charcoal-600 text-warm-500 hover:border-brand-blue hover:text-brand-blue transition-colors duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
