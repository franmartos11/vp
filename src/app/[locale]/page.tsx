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
import { AllServicesGrid } from "@/components/sections/AllServicesGrid";
import { db } from "@/lib/db";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  let featuredProjects = await db.project.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    take: 3,
  });

  if (featuredProjects.length === 0) {
    featuredProjects = await db.project.findMany({
      orderBy: { order: "asc" },
      take: 3,
    });
  }

  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <InfiniteMarquee />
        <AllServicesGrid />
        <StickyPillars />
        <MakersStory />

        <StatsSection />
        <TrustedPartners />
        <ParallaxSeparator />

        {featuredProjects.length > 0 && (
          <section className="py-24 md:py-32 bg-cream-50" aria-labelledby="portfolio-heading">
            <div className="container mx-auto px-6">
              <AnimatedSection className="flex items-end justify-between mb-12">
                <SectionHeading
                  eyebrow={t("selected_works")}
                  title={t("featured_projects")}
                />
                <Link
                  href="/portfolio"
                  className="hidden md:flex items-center gap-2 text-sm text-brand-blue hover:text-brand-blue-dark transition-colors"
                >
                  {t("view_all")} <ArrowRight size={14} />
                </Link>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project as any} priority={index === 0} />
                ))}
              </div>

              <div className="mt-10 md:hidden">
                <Link href="/portfolio" className="btn-outline">
                  {t("view_all_projects")} <ArrowRight size={14} />
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
                  eyebrow={t("selected_works")}
                  title={t("portfolio_soon")}
                  subtitle={t("portfolio_soon_desc")}
                  align="center"
                />
                <div className="mt-8">
                  <Link href="/contact" className="btn-primary">
                    {t("get_in_touch")} <ArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        <ProcessTimeline />
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
                    eyebrow={t("start_project_eyebrow")}
                    title={t("ready_to_engineer")}
                    subtitle={t("ready_to_engineer_desc")}
                    light
                  />
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-9 mt-6 md:mt-0 flex justify-start md:justify-end">
                  <Link href="/contact" className="btn-outline border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                    {t("contact_us")} <ArrowRight size={14} />
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
