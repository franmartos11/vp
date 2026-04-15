"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { useTranslations } from "next-intl";

const PARTNERS = [
  "Agudelo Architect P.A.",
  "Pacheco Architecture LLC",
  "Daza Design Inc.",
  "Florida Builders Engineering & Inspectors Inc",
  "Red Design Group",
  "MEISNER ELECTRIC, INC.",
  "Gallery Pool & Spa",
  "Techno Piling",
  "Direct Builders"
];

export function TrustedPartners() {
  const t = useTranslations("TrustedPartners");

  return (
    <section className="bg-white border-t border-charcoal-900/10 overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 pt-20 md:pt-28 pb-16 md:pb-20">
        <AnimatedSection>
          <span className="text-[10px] uppercase tracking-[0.35em] text-brand-blue/70 font-mono block mb-6">
            {t("heading")}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal-900 leading-tight max-w-3xl">
            Firms that{" "}
            <span className="text-brand-blue italic font-light">
              trust us.
            </span>
          </h2>
        </AnimatedSection>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-charcoal-900/15 to-transparent" />

      {/* Infinite Marquee */}
      <div className="relative flex overflow-hidden w-full py-10 md:py-14">
        {/* Edge fades — match charcoal-900 */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes trustedMarquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .trusted-marquee-track {
            animation: trustedMarquee 40s linear infinite;
            display: flex;
            align-items: center;
            will-change: transform;
          }
          .trusted-marquee-track:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="trusted-marquee-track">
          {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
            <div key={idx} className="flex items-center shrink-0">
              <span className="px-8 md:px-12 font-display font-light text-lg md:text-2xl text-charcoal-400 hover:text-charcoal-900 transition-colors duration-500 whitespace-nowrap">
                {partner}
              </span>
              <span className="text-charcoal-300 text-base leading-none">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding */}
      <div className="pb-16 md:pb-24" />
    </section>
  );
}
