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
                What We Offer
              </span>
              <h2
                id="all-services-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-900 leading-tight"
              >
                All our{" "}
                <span className="italic font-light text-brand-blue">
                  engineering services.
                </span>
              </h2>
            </div>
              <p className="text-charcoal-600 font-light text-base md:text-lg max-w-xs md:max-w-sm leading-relaxed md:text-right">
                Comprehensive structural and MEP solutions — from design to
                inspection — delivered under one firm.
            </p>
          </div>
        </AnimatedSection>

        {/* Primary Services — Grid 2x2 */}
        <AnimatedSection className="mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-charcoal-400 block mb-4">
            — Full-Service Disciplines
          </span>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
        >
          {PRIMARY_SERVICES.map((service) => (
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
                    View service details <ExternalLink size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services — row of 5 */}
        <AnimatedSection className="mb-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-charcoal-400 block mb-4">
            — Additional Services
          </span>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {ADDITIONAL_SERVICES.map((service) => (
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
            Not sure which service fits your project? We'll help you find the
            right engineering approach.
          </p>
          <Link
            href="/contact"
            className="btn-primary"
          >
            Talk to an engineer <ArrowUpRight size={14} className="ml-1" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
