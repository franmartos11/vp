"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { useTranslations } from "next-intl";

const PARTNERS = [
  "ARCH DIGEST",
  "VOGUE LIVING",
  "NEW YORK TIMES",
  "WALLPAPER*",
  "ELLE DECOR"
];

export function TrustedPartners() {
  const t = useTranslations("TrustedPartners");
  return (
    <section className="py-16 md:py-24 bg-cream-50 border-t border-warm-200 overflow-hidden">
       <div className="container mx-auto px-6">
         <AnimatedSection className="text-center mb-10">
           <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal-600 font-mono">{t("heading")}</span>
         </AnimatedSection>
         
         <AnimatedSection className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-24 opacity-40 mix-blend-multiply grayscale hover:opacity-100 transition-opacity duration-700">
           {PARTNERS.map((partner) => (
             <span key={partner} className="text-xl md:text-2xl font-display font-medium text-charcoal-900 tracking-wider">
               {partner}
             </span>
           ))}
         </AnimatedSection>
       </div>
    </section>
  );
}
