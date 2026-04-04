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

const PRIMARY_SERVICES: Service[] = [
  {
    id: 1,
    title: "Structural Engineering",
    description:
      "Comprehensive structural design for residential and commercial projects. Accurate, code-compliant designs with a strong focus on constructability and cost-efficiency under the Florida Building Code.",
    slug: "structural-engineering",
    tag: "Full Service",
    isPrimary: true,
  },
  {
    id: 2,
    title: "MEP Engineering",
    description:
      "Integrated mechanical, electrical, and plumbing design coordinated under one firm. We eliminate costly interdisciplinary gaps and deliver fully integrated solutions from concept to permit.",
    slug: "mep-engineering",
    tag: "Full Service",
    isPrimary: true,
  },
  {
    id: 3,
    title: "Building Recertifications",
    description:
      "Structural and electrical recertification services including 25, 30, 40, 50-year recertifications and beyond. We utilize drone technology to efficiently inspect hard-to-access areas.",
    slug: "building-recertifications",
    tag: "Full Service",
    isPrimary: true,
  },
  {
    id: 4,
    title: "Structural Inspections",
    description:
      "Field inspections during construction to verify work is completed per approved plans, design intent, and applicable codes. Ensuring quality, compliance, and proper execution at each stage.",
    slug: "structural-inspections",
    tag: "Full Service",
    isPrimary: true,
  },
];

const ADDITIONAL_SERVICES: Service[] = [
  {
    id: 5,
    title: "Single & Multi-Family Homes",
    description:
      "Structural and MEP design for custom residences, duplexes, and townhomes. Focused on efficiency, constructability, and full code compliance.",
    tag: "Residential",
  },
  {
    id: 6,
    title: "Additions & Renovations",
    description:
      "Structural and MEP solutions for additions and renovations — improving functionality, expanding spaces, and reinforcing structural elements while integrating with the existing structure.",
    tag: "Residential / Commercial",
  },
  {
    id: 7,
    title: "Commercial Buildings",
    description:
      "Structural and MEP design for new commercial buildings and expansions. Efficient, code-compliant solutions tailored to each project's specific requirements.",
    tag: "Commercial",
  },
  {
    id: 8,
    title: "Aluminum Terraces & Pergolas",
    description:
      "Structural design and analysis for aluminum terraces, pergolas, and outdoor structures ensuring stability, durability, and compliance with wind load requirements.",
    tag: "Specialty",
  },
  {
    id: 9,
    title: "Shop Drawings",
    description:
      "Detailed shop drawings for stairs, railings, gates, fences, canopies, and other structural components. Developed for accuracy, constructability, and full code compliance.",
    tag: "Documentation",
  },
];

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
  return (
    <section
      className="py-24 md:py-36 bg-charcoal-900 border-t border-warm-800/20"
      aria-labelledby="all-services-heading"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue mb-5 block flex items-center gap-3">
                <span className="w-6 h-px bg-brand-blue inline-block" />
                What We Offer
              </span>
              <h2
                id="all-services-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight"
              >
                All our{" "}
                <span className="italic font-light text-warm-300">
                  engineering services.
                </span>
              </h2>
            </div>
            <p className="text-warm-100/60 font-light text-base md:text-lg max-w-sm leading-relaxed md:text-right">
              Comprehensive structural and MEP solutions — from design to
              inspection — delivered under one firm.
            </p>
          </div>
        </AnimatedSection>

        {/* Primary Services — with dedicated pages */}
        <AnimatedSection className="mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-warm-600 block mb-6">
            — Full-Service Disciplines
          </span>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
        >
          {PRIMARY_SERVICES.map((service) => (
            <motion.div key={service.id} variants={cardVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex flex-col h-full min-h-[280px] bg-charcoal-800 border border-charcoal-700 hover:border-brand-blue/40 rounded-lg p-7 transition-all duration-500 hover:bg-charcoal-800/80 overflow-hidden shadow-sm hover:shadow-brand-blue/10"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-brand-blue/10 via-transparent to-transparent pointer-events-none rounded-lg" />

                {/* Tag */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-1 rounded-sm">
                    {service.tag}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-warm-600 group-hover:text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>

                {/* Number */}
                <span className="font-mono text-[11px] text-warm-500 group-hover:text-brand-blue/60 mb-3 tracking-widest relative z-10 transition-colors duration-300">
                  {String(service.id).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3 className="font-display text-xl lg:text-2xl text-white group-hover:text-white transition-colors duration-300 leading-tight mb-4 flex-1 relative z-10">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-warm-300 group-hover:text-warm-100 text-sm font-light leading-relaxed transition-colors duration-300 line-clamp-3 relative z-10">
                  {service.description}
                </p>

                {/* Bottom bar */}
                <div className="mt-6 pt-4 border-t border-charcoal-700 group-hover:border-brand-blue/30 transition-colors duration-500 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-warm-400 group-hover:text-brand-blue transition-colors duration-300 flex items-center gap-2">
                    View service details <ExternalLink size={10} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services — no dedicated pages */}
        <AnimatedSection className="mt-14 mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-warm-600 block mb-6">
            — Additional Services
          </span>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {ADDITIONAL_SERVICES.map((service) => (
            <motion.div key={service.id} variants={cardVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="group relative flex flex-col h-full min-h-[220px] bg-charcoal-900 border border-charcoal-800 hover:border-brand-blue/20 rounded-lg p-6 transition-all duration-500 hover:bg-charcoal-800 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent to-brand-blue/5 pointer-events-none rounded-lg" />
                
                {/* Tag */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-warm-500 border border-charcoal-700 px-2 py-0.5 rounded-sm">
                    {service.tag}
                  </span>
                </div>

                {/* Number */}
                <span className="font-mono text-[11px] text-warm-500 mb-2.5 tracking-widest relative z-10">
                  {String(service.id).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg text-warm-100 group-hover:text-brand-blue transition-colors duration-300 leading-snug mb-3 flex-1 relative z-10">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-warm-300/75 group-hover:text-warm-200 text-xs font-light leading-relaxed transition-colors duration-300 line-clamp-4 relative z-10">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <AnimatedSection className="mt-16 pt-12 border-t border-warm-800/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-warm-300 font-light text-sm max-w-md">
            Not sure which service fits your project? We'll help you find the
            right engineering approach.
          </p>
          <Link
            href="/contact"
            className="btn-primary border border-transparent font-mono uppercase tracking-widest rounded-sm shrink-0"
          >
            Talk to an engineer <ArrowUpRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
