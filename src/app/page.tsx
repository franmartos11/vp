import type { Metadata } from "next";
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
import { StickyPillars } from "@/components/sections/StickyPillars";
import { InfiniteMarquee } from "@/components/sections/InfiniteMarquee";
import { MakersStory } from "@/components/sections/MakersStory";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ParallaxSeparator } from "@/components/sections/ParallaxSeparator";
import { TrustedPartners } from "@/components/sections/TrustedPartners";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Luxury Architecture & Construction | Vertex Build Group",
  description:
    "Vertex Build Group — Award-winning luxury architecture and construction in the United States. Residential, commercial, and interior projects crafted with precision.",
};

export default async function HomePage() {
  let featuredProjects = await db.project.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    take: 3
  });

  if (featuredProjects.length === 0) {
    featuredProjects = await db.project.findMany({
      orderBy: { order: "asc" },
      take: 3
    });
  }

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <HeroSection />

        <InfiniteMarquee />
        <MakersStory />

        {/* Pillars */}
        <StickyPillars />

        {/* Stats */}
        <StatsSection />
        
        <TrustedPartners />
        <ParallaxSeparator />

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
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project as any} priority={index === 0} />
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

        <ProcessTimeline />

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
