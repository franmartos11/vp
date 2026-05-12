"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useTranslations } from "next-intl";

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

  const primaryServices: Service[] = [
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

  const additionalServices: Service[] = [
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
    <section className="py-24 bg-white" id="services">
      <div className="container mx-auto px-6 md:px-12">
        <AnimatedSection className="max-w-3xl mb-20">
          <span className="text-xs font-mono tracking-widest text-brand-blue uppercase mb-4 block">
            {t("eyebrow")}
          </span>
          <h2 className="text-4xl md:text-6xl font-display text-charcoal-900 mb-6 leading-tight">
            {t("title_1")} <span className="italic text-brand-blue">{t("title_2")}</span>
          </h2>
          <p className="text-lg text-warm-500 font-light leading-relaxed">
            {t("description")}
          </p>
        </AnimatedSection>

        {/* Primary Services - Large Cards */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-sm font-mono tracking-widest text-warm-400 uppercase">
              {t("disciplines_label")}
            </h3>
            <div className="h-px flex-1 bg-warm-200" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {primaryServices.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative bg-warm-50 p-8 md:p-12 border border-warm-200 hover:border-brand-blue transition-all duration-500 hover:shadow-2xl hover:shadow-brand-blue/5"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="text-xs font-mono tracking-tighter text-brand-blue/60 border border-brand-blue/20 px-2 py-1">
                    {service.tag}
                  </span>
                  <ArrowUpRight
                    size={24}
                    className="text-warm-300 group-hover:text-brand-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  />
                </div>

                <h4 className="text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
                  {service.title}
                </h4>
                <p className="text-warm-500 font-light leading-relaxed mb-10 max-w-sm">
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-charcoal-900 group-hover:text-brand-blue transition-colors"
                >
                  {t("view_details")}
                  <div className="w-8 h-px bg-charcoal-900 group-hover:bg-brand-blue group-hover:w-12 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional Services - Smaller Grid */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-sm font-mono tracking-widest text-warm-400 uppercase">
              {t("additional_label")}
            </h3>
            <div className="h-px flex-1 bg-warm-200" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {additionalServices.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="p-6 md:p-8 border border-warm-100 hover:border-brand-blue/30 transition-all duration-300 bg-white group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-warm-400 uppercase">
                    {service.tag}
                  </span>
                  <ExternalLink size={14} className="text-warm-200 group-hover:text-brand-blue transition-colors" />
                </div>
                <h4 className="text-lg font-display text-charcoal-900 mb-3 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-warm-500 font-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              variants={cardVariants}
              className="p-6 md:p-8 bg-brand-blue text-white flex flex-col justify-between"
            >
              <p className="text-sm font-light leading-relaxed mb-8 opacity-90">
                {t("cta_desc")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-xs font-mono tracking-widest uppercase hover:gap-5 transition-all duration-300"
              >
                {t("cta_btn")} <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
