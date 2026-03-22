import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import { db } from "@/lib/db";

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
  const projects = await db.project.findMany({
    orderBy: { order: "asc" }
  }) as any[];

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
                  <div className="w-12 h-px bg-warm-400" /> Our Work
                </span>
                <h1 className="text-display-xl lg:text-[7rem] font-display text-white leading-[0.9] mb-8 drop-shadow-2xl">
                  Selected <br />
                  <span className="text-warm-200 italic font-light">projects.</span>
                </h1>
                <p className="text-warm-300 text-lg md:text-2xl font-light leading-relaxed max-w-2xl">
                  A curated selection of our residential, commercial, renovation, and interior design work across the United States.
                </p>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-warm-500/40 flex flex-col items-center gap-3 animate-bounce">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] rotate-90 translate-y-2 mb-4">Discover</span>
            <div className="w-px h-16 bg-gradient-to-b from-warm-500/50 to-transparent" />
          </div>
        </section>

        {/* Portfolio Content */}
        <section className="container mx-auto pb-16 md:pb-20">
          <AnimatedSection>
            <div className="flex justify-between items-end border-b border-warm-200 pb-8 mb-12">
              <h2 className="text-2xl md:text-3xl font-display text-charcoal-900">Explore our portfolio</h2>
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
                Portfolio projects are being added. Please check back soon.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
