import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { HeroSection } from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { sanityFetch, featuredProjectsQuery } from "@/sanity/lib/queries";
import { FALLBACK_PROJECTS } from "@/lib/fallbackData";

export const metadata: Metadata = {
  title: "Luxury Architecture & Construction | Vertex Build Group",
  description:
    "Vertex Build Group — Award-winning luxury architecture and construction in the United States. Residential, commercial, and interior projects crafted with precision.",
};

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  projectType: string;
  completionYear?: number;
  location?: string;
  coverImage: { asset: { _ref: string }; alt?: string };
};

const PILLARS = [
  {
    number: "01",
    title: "Precision Design",
    description:
      "Every detail engineered to purpose. We apply Swiss-inspired rigor to spatial planning, material selection, and finish.",
  },
  {
    number: "02",
    title: "Timeless Craft",
    description:
      "We work with master craftspeople and premium subcontractors who share our obsession with long-lasting quality.",
  },
  {
    number: "03",
    title: "Client Partnership",
    description:
      "Transparent communication and collaborative process — so you always know exactly where your project stands.",
  },
];

export default async function HomePage() {
  let featuredProjects: Project[] = [];
  try {
    featuredProjects = await sanityFetch<Project[]>({
      query: featuredProjectsQuery,
      tags: ["project"],
    });
  } catch {
    // CMS not connected yet — graceful fallback
  }

  if (featuredProjects.length === 0) {
    featuredProjects = FALLBACK_PROJECTS.slice(0, 3) as any[];
  }

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <HeroSection />

        {/* Pillars */}
        <section className="py-24 md:py-32" aria-labelledby="pillars-heading">
          <div className="container mx-auto">
            <AnimatedSection>
              <SectionHeading
                eyebrow="Our Approach"
                title="Architecture with intention."
                subtitle="We design and build spaces that endure — aesthetically and structurally. No shortcuts."
                className="mb-16"
              />
            </AnimatedSection>

            <AnimatedSection stagger className="grid-swiss">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="col-span-12 md:col-span-4 border-t border-warm-200 pt-8"
                >
                  <span className="eyebrow text-warm-300 block mb-4">{pillar.number}</span>
                  <h3 className="font-display text-xl text-charcoal-900 mb-3">{pillar.title}</h3>
                  <p className="text-sm text-warm-500 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* Stats */}
        <StatsSection />

        {/* Featured Portfolio */}
        {featuredProjects.length > 0 && (
          <section className="py-24 md:py-32 bg-cream-50" aria-labelledby="portfolio-heading">
            <div className="container mx-auto">
              <AnimatedSection className="flex items-end justify-between mb-12">
                <SectionHeading
                  eyebrow="Selected Works"
                  title="Featured projects."
                />
                <Link
                  href="/portfolio"
                  className="hidden md:flex items-center gap-2 text-sm text-warm-500 hover:text-charcoal-900 transition-colors"
                >
                  View all <ArrowRight size={14} />
                </Link>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project, i) => (
                  <ProjectCard key={project._id} project={project} priority={i === 0} />
                ))}
              </div>

              <div className="mt-10 md:hidden">
                <Link href="/portfolio" className="btn-outline">
                  View all projects <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Fallback CTA if no CMS data */}
        {featuredProjects.length === 0 && (
          <section className="py-24 md:py-32 bg-cream-50">
            <div className="container mx-auto text-center">
              <AnimatedSection>
                <SectionHeading
                  eyebrow="Selected Works"
                  title="Portfolio coming soon."
                  subtitle="We're uploading our project portfolio. Check back shortly."
                  align="center"
                />
                <div className="mt-8">
                  <Link href="/contact" className="btn-primary">
                    Get in touch <ArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Band */}
        <section
          className="py-24 md:py-32 bg-charcoal-900"
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto">
            <AnimatedSection>
              <div className="grid-swiss items-center">
                <div className="col-span-12 md:col-span-7">
                  <SectionHeading
                    eyebrow="Start a project"
                    title="Let's build something exceptional."
                    subtitle="Tell us about your vision. We'll tell you how we'd approach it."
                    light
                  />
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-9 mt-8 md:mt-0 flex justify-start md:justify-end">
                  <Link href="/contact" className="btn-outline border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900">
                    Contact us <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
