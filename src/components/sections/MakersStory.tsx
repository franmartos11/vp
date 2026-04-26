"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslations } from "next-intl";

export function MakersStory() {
  const t = useTranslations("MakersStory");
  return (
    <section className="py-24 md:py-32 bg-cream-50 overflow-hidden" aria-labelledby="manifesto-heading">
      <div className="container mx-auto px-6 md:px-12">
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <div className="lg:col-span-5 relative h-[300px] md:h-[420px] lg:h-[700px] w-full">
            <Image
              src="personaplano.png"
              alt="Architect drafting plans"
              fill
              unoptimized
              className="object-cover object-center opacity-80 contrast-125"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-charcoal-900/10 mix-blend-multiply" />

            {/* Aesthetic offset frame */}
            <div className="hidden lg:block absolute -inset-6 bg-transparent border border-brand-blue/20 -z-10 translate-x-3 translate-y-3" />
          </div>

          {/* Text */}
          <div className="md:col-span-1 lg:col-span-7">
            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              className="mb-8"
            />
            <div className="prose prose-lg text-charcoal-700 font-light max-w-2xl leading-relaxed">
              <p className="mb-6">
                {t('description')}
              </p>
              <div className="mb-8 p-4 sm:p-6 bg-brand-blue/5 border-l-4 border-brand-blue rounded-r-lg">
                <p className="text-brand-blue font-display text-base sm:text-xl leading-relaxed uppercase sm:tracking-wide">
                  {t('mission')}
                </p>
              </div>
              <p className="mb-6">
                We specialize in structural design for residential and commercial projects, along with MEP coordination, delivering efficient and fully integrated solutions under one firm.
              </p>
              <p className="mb-10 text-charcoal-900 font-normal">
                We take pride in providing reliable, high-quality engineering services at competitive prices — meeting deadlines and supporting our clients with clear communication, helping them achieve their vision through a smooth, efficient, and stress-free process.
              </p>
              <div className="font-display italic text-3xl md:text-4xl text-brand-blue">
                DH Engineering
              </div>
              <p className="text-xs uppercase tracking-widest text-charcoal-600 mt-2 font-mono">& Consulting LLC</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
