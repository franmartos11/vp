"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

export function MakersStory() {
  return (
    <section className="py-24 md:py-32 bg-cream-50 overflow-hidden" aria-labelledby="manifesto-heading">
      <div className="container mx-auto px-6 md:px-12">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] w-full">
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format"
              alt="Architect drafting plans"
              fill
              unoptimized
              className="object-cover object-center grayscale opacity-80 contrast-125"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-charcoal-900/10 mix-blend-multiply" />
            
            {/* Aesthetic offset frame */}
            <div className="hidden lg:block absolute -inset-6 bg-transparent border border-warm-200 -z-10 translate-x-3 translate-y-3" />
          </div>

          {/* Text */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Maker's Story"
              title="A relentless pursuit of permanence."
              className="mb-8"
            />
            <div className="prose prose-lg text-charcoal-700 font-light max-w-2xl leading-relaxed">
              <p className="mb-6">
                When we founded VERTEX, the vision was singular: to bridge the gap between uncompromising design and masterful execution. Too often, visionary architecture is lost in translation during construction.
              </p>
              <p className="mb-6">
                We believe that a building should not merely exist; it should resonate. Every pour of concrete, every piece of millwork, and every sheet of glass we place is meticulously intended to stand the test of time and trends.
              </p>
              <p className="mb-10 text-charcoal-900 font-normal">
                Because true luxury isn't about extravagance—it's about absolute precision and flawless execution.
              </p>
              <div className="font-display italic text-3xl md:text-4xl text-warm-500">
                James Vertex
              </div>
              <p className="text-xs uppercase tracking-widest text-warm-400 mt-2 font-mono">Principal & Founder</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
