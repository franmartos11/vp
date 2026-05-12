"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

type Service = {
  id: number;
  title: string;
  description: string;
  slug?: string; // Only for primary services with dedicated pages
  tag?: string;
  isPrimary?: boolean;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function AllServicesGrid() {
  const t = useTranslations("AllServicesGrid");

  const primaryServices = [
    {
      id: 1,
      title: t("primary.structural.title"),
      description: t("primary.structural.desc"),
      slug: "structural-engineering",
      tag: t("primary.structural.tag"),
      isPrimary: true,
    },
    {
      id: 2,
      title: t("primary.mep.title"),
      description: t("primary.mep.desc"),
      slug: "mep-engineering",
      tag: t("primary.mep.tag"),
      isPrimary: true,
    },
    {
      id: 3,
      title: t("primary.recert.title"),
      description: t("primary.recert.desc"),
      slug: "building-recertifications",
      tag: t("primary.recert.tag"),
      isPrimary: true,
    },
    {
      id: 4,
      title: t("primary.inspections.title"),
      description: t("primary.inspections.desc"),
      slug: "structural-inspections",
      tag: t("primary.inspections.tag"),
      isPrimary: true,
    },
  ];

  const additionalServices = [
    {
      id: 5,
      title: t("additional.residential.title"),
      description: t("additional.residential.desc"),
      tag: t("additional.residential.tag"),
    },
    {
      id: 6,
      title: t("additional.additions.title"),
      description: t("additional.additions.desc"),
      tag: t("additional.additions.tag"),
    },
    {
      id: 7,
      title: t("additional.commercial.title"),
      description: t("additional.commercial.desc"),
      tag: t("additional.commercial.tag"),
    },
    {
      id: 8,
      title: t("additional.outdoor.title"),
      description: t("additional.outdoor.desc"),
      tag: t("additional.outdoor.tag"),
    },
    {
      id: 9,
      title: t("additional.shop.title"),
      description: t("additional.shop.desc"),
      tag: t("additional.shop.tag"),
    },
  ];

  return (
    <section
      className="py-20 md:py-28 bg-white border-t border-brand-blue"
      aria-labelledby="all-services-heading"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue mb-5 block flex items-center gap-3">
                <span className="w-6 h-px bg-brand-blue inline-block" />
                {t("eyebrow")}
              </span>
              <h2
                id="all-services-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-900 leading-tight"
              >
                {t("title_1")}{" "}
                <span className="italic font-light text-brand-blue">
                  {t("title_2")}
                </span>
              </h2>
            </div>
              <p className="text-lg font-light text-charcoal-600 max-w-sm leading-relaxed md:text-right">
                {t("description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Primary Services — Grid 2x2 */}
        <AnimatedSection className="mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-charcoal-400 block mb-4">
            — {t("disciplines_label")}
          </span>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
        >
          {primaryServices.map((service) => (
            <motion.div key={service.id} variants={cardVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex flex-col h-full bg-white border border-warm-200 border-t-[3px] border-t-brand-blue hover:border-brand-blue/50 rounded-lg p-6 md:p-8 transition-all duration-500 hover:shadow-lg hover:shadow-brand-blue/10 overflow-hidden"
              >
                {/* Tag and Arrow */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-blue bg-brand-blue/5 border border-brand-blue/20 px-3 py-1.5 rounded-sm">
                    {service.tag}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-charcoal-300 group-hover:text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>

                {/* Number */}
                <span className="font-mono text-[12px] text-brand-blue mb-4 tracking-widest relative z-10 transition-colors duration-300 font-semibold">
                  {String(service.id).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3 className="font-display text-2xl lg:text-3xl text-charcoal-900 group-hover:text-brand-blue transition-colors duration-300 leading-tight mb-4 flex-1 relative z-10">
                  {service.title}
                </h3>

                {/* Description - FULL, not truncated */}
                <p className="text-charcoal-600 group-hover:text-charcoal-800 text-sm font-light leading-relaxed transition-colors duration-300 relative z-10">
                  {service.description}
                </p>

                {/* Bottom bar */}
                <div className="mt-8 pt-5 border-t border-warm-100 group-hover:border-brand-blue/20 transition-colors duration-500 relative z-10">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal-500 group-hover:text-brand-blue transition-colors duration-300 flex items-center gap-2">
                    {t("view_details")} <ExternalLink size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services — row of 5 */}
        <AnimatedSection className="mb-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-charcoal-400 block mb-4">
            — {t("additional_label")}
          </span>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {additionalServices.map((service) => (
            <motion.div key={service.id} variants={cardVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="group relative flex flex-col h-full bg-cream-100 border-l-[3px] border-l-brand-blue border-y border-r border-transparent hover:border-warm-200 rounded-lg p-5 transition-all duration-300 hover:shadow-sm">
                
                {/* Tag */}
                <div className="mb-3 relative z-10">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-blue">
                    {service.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-base text-charcoal-900 leading-snug mb-2 relative z-10 font-medium">
                  <span className="text-[10px] font-mono text-warm-500 mr-2">{String(service.id).padStart(2, "0")}</span>
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-charcoal-600 text-xs font-light leading-relaxed relative z-10">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <AnimatedSection className="mt-16 pt-10 border-t border-warm-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-charcoal-600 font-light text-sm max-w-md">
            {t("cta_desc")}
          </p>
          <Link
            href="/contact"
            className="btn-primary"
          >
            {t("cta_btn")} <ArrowUpRight size={14} className="ml-1" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
