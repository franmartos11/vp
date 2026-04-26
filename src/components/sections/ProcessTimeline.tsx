"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslations } from "next-intl";

const STEPS_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format",
  "personaplano.png",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&auto=format"
];

export function ProcessTimeline() {
  const t = useTranslations("ProcessTimeline");

  // Definición del schema JSON-LD para HowTo
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": t("title"),
    "description": t("intro"),
    "step": [0, 1, 2, 3].map((index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": t(`steps.${index}.title` as any),
      "text": t(`steps.${index}.desc` as any),
      "image": STEPS_IMAGES[index]
    }))
  };

  return (
    <section id="how-we-work" aria-labelledby="process-heading" className="py-24 md:py-32 bg-cream-100 border-t border-warm-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="container mx-auto px-6 md:px-12">
        <AnimatedSection className="max-w-3xl mb-16">
          <SectionHeading
            id="process-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("intro")}
          />
        </AnimatedSection>

        <div className="max-w-6xl mx-auto relative">
          <div className="space-y-8 md:space-y-16 lg:space-y-24">
            {[0, 1, 2, 3].map((index) => {
              const num = t(`steps.${index}.num` as any);
              const title = t(`steps.${index}.title` as any);
              const desc = t(`steps.${index}.desc` as any);

              return (
                <AnimatedSection key={index}>
                  <article
                    itemScope
                    itemType="https://schema.org/HowToStep"
                    className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 lg:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <meta itemProp="position" content={String(index + 1)} />

                    {/* Visual Node / Image */}
                    <div className="w-full md:w-1/2 relative h-[250px] md:h-[450px] overflow-hidden group border border-warm-200 shadow-xl">
                      <Image
                        src={STEPS_IMAGES[index]}
                        alt={title}
                        fill
                        unoptimized
                        itemProp="image"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-charcoal-900/10 mix-blend-multiply" />
                      {/* Number overlay */}
                      <div className={`absolute bottom-0 bg-white/95 backdrop-blur-sm border-l-4 border-brand-blue px-6 py-4 ${index % 2 === 0 ? 'right-0' : 'left-0'}`}>
                        <span className="text-3xl md:text-5xl font-display text-charcoal-900 leading-none">{num}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 relative bg-transparent px-0 py-4 md:p-8 flex flex-col items-start text-left">
                      <span className="text-xs tracking-widest uppercase text-brand-blue font-mono mb-4 block">{t("stage_label")} {num}</span>
                      <h3 itemProp="name" className="text-2xl md:text-4xl font-display text-charcoal-900 mb-6">{title}</h3>
                      <p itemProp="text" className="text-charcoal-700 font-light leading-relaxed md:max-w-md text-lg text-left">{desc}</p>
                      <div className="mt-8 w-12 h-px bg-brand-blue" />
                    </div>
                  </article>
                </AnimatedSection>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <AnimatedSection className="mt-20 md:mt-32 text-center">
          <h3 className="text-2xl md:text-3xl font-display text-charcoal-900 mb-6">
            {t("cta_text")}
          </h3>
          <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
            {t("cta_link_label")} <ArrowRight size={14} />
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
}
