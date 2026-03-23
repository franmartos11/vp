import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import { db } from "@/lib/db";
import { getLocale, getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Vertex Build Group's portfolio of luxury residential, commercial, and interior projects across the United States.",
  openGraph: {
    title: "Portfolio — Vertex Build Group",
    description: "Luxury architecture and construction projects across the US.",
  },
};

export default async function PortfolioPage() {
  const t = await getTranslations("PortfolioPage");
  const locale = await getLocale();

  const rawProjects = await db.project.findMany({
    orderBy: { order: "asc" }
  }) as any[];

  // Dynamic mapping for i18n
  const projects = rawProjects.map(p => ({
    ...p,
    title: locale === 'es' && p.titleEs ? p.titleEs : p.title,
    description: locale === 'es' && p.descriptionEs ? p.descriptionEs : p.description,
    projectType: locale === 'es' && p.projectTypeEs ? p.projectTypeEs : p.projectType,
    location: locale === 'es' && p.locationEs ? p.locationEs : p.location,
    technicalSheet: locale === 'es' && p.technicalSheetEs ? p.technicalSheetEs : p.technicalSheet,
    materials: locale === 'es' && p.materialsEs ? p.materialsEs : p.materials,
    testimonial: locale === 'es' && p.testimonialEs ? p.testimonialEs : p.testimonial,
  }));

  return (
    <>
      <Nav />
      <main className="bg-cream-50">
        
        {/* Dark Immersive Hero */}
        <section className="relative h-[85vh] w-full overflow-hidden bg-charcoal-900 group mb-16 md:mb-24">
          {/* Background Texture */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&auto=format"
              alt="Luxury architecture portfolio"
              fill
              className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-[30s] ease-out mix-blend-luminosity grayscale"
              priority
              sizes="100vw"
            />
          </div>
          {/* Gradients for text legibility and mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 to-transparent" />
          
          {/* Content Wrapper */}
          <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 container mx-auto px-6 z-10">
            <AnimatedSection>
              <div className="max-w-4xl">
                <span className="text-warm-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-8 block flex items-center gap-4">
                  <div className="w-12 h-px bg-warm-400" /> {t("our_work")}
                </span>
                <h1 className="text-display-xl lg:text-[7rem] font-display text-white leading-[0.9] mb-8 drop-shadow-2xl">
                  {t("title_1")} <br />
                  <span className="text-warm-200 italic font-light">{t("title_2")}</span>
                </h1>
                <p className="text-warm-300 text-lg md:text-2xl font-light leading-relaxed max-w-2xl">
                  {t("subtitle")}
                </p>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-warm-500/40 flex flex-col items-center gap-3 animate-bounce">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] rotate-90 translate-y-2 mb-4">{t("discover")}</span>
            <div className="w-px h-16 bg-gradient-to-b from-warm-500/50 to-transparent" />
          </div>
        </section>

        {/* Portfolio Content */}
        <section className="container mx-auto pb-16 md:pb-20">
          <AnimatedSection>
            <div className="flex justify-between items-end border-b border-warm-200 pb-8 mb-12">
              <h2 className="text-2xl md:text-3xl font-display text-charcoal-900">{t("explore")}</h2>
              <p className="text-xs text-warm-500 font-mono tracking-widest uppercase">
                {projects.length > 0 ? `${projects.length} projects` : ""}
              </p>
            </div>
          </AnimatedSection>

          {/* Portfolio grid with filter */}
          <PortfolioGrid projects={projects} />

          {/* Empty state */}
          {projects.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-warm-500 text-sm">
                {t("empty")}
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
