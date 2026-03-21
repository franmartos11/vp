import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
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
      <main className="pt-28 md:pt-36">
        {/* Header */}
        <section className="container mx-auto pb-16 md:pb-20">
          <AnimatedSection>
            <div className="grid-swiss border-b border-warm-200 pb-12 mb-16">
              <div className="col-span-12 md:col-span-8">
                <SectionHeading
                  eyebrow="Our Work"
                  title="Selected projects."
                  subtitle="A curated selection of our residential, commercial, renovation, and interior design work."
                />
              </div>
              <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col justify-end">
                <p className="text-xs text-warm-500">
                  {projects.length > 0 ? `${projects.length} projects` : ""}
                </p>
              </div>
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
