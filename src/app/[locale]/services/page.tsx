import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FAQSection from "@/components/sections/FAQSection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { db } from "@/lib/db";
import { getLocale, getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vertex Build Group offers end-to-end luxury architecture, construction management, renovation, and interior design services across the United States.",
};

export default async function ServicesPage() {
  const t = await getTranslations("ServicesPage");
  const locale = await getLocale();

  const rawServices = (await db.service.findMany({
    orderBy: { order: "asc" },
  })) as any[];

  // Dynamic mapping for i18n
  const displayServices = rawServices.map((s) => ({
    ...s,
    title: locale === "es" && s.titleEs ? s.titleEs : s.title,
    shortDescription:
      locale === "es" && s.shortDescriptionEs
        ? s.shortDescriptionEs
        : s.shortDescription,
  }));

  return (
    <>
      <Nav />
      <main className="bg-cream-50">
        {/* Dark Immersive Hero */}
        <section className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden bg-charcoal-900 group mb-16 md:mb-32">
          {/* Background Texture */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&auto=format"
              alt="Abstract architecture structure"
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
                <span className="text-brand-blue font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-8 block flex items-center gap-4">
                  <div className="w-12 h-px bg-brand-blue" /> {t("what_we_do")}
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] lg:text-[7rem] font-display text-white leading-[0.9] mb-6 md:mb-8 drop-shadow-2xl">
                  {t("hero_title_1")} <br />
                  <span className="text-brand-blue/70 italic font-light">
                    {t("hero_title_2")}
                  </span>
                </h1>
                <p className="text-warm-300 text-base md:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl">
                  {t("hero_subtitle")}
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-warm-500/40 flex flex-col items-center gap-3 animate-bounce">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] rotate-90 translate-y-2 mb-4">
              {t("discover")}
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-warm-500/50 to-transparent" />
          </div>
        </section>

        {/* Services Zig-Zag Layout */}
        <section className="pb-24 md:pb-32 overflow-hidden">
          {displayServices.map((service, i) => {
            const isEven = i % 2 !== 0; // Alternating logic
            const imageUrl =
              service.coverImage ||
              "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&auto=format";

            return (
              <AnimatedSection key={service.id} delay={i * 100}>
                <div
                  className={`flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} items-center mb-12 md:mb-24 lg:mb-32 group`}
                >
                  {/* Image Block */}
                  <div className="w-full lg:w-1/2 h-[40vh] md:h-[50vh] min-h-[280px] lg:h-[750px] relative overflow-hidden">
                    <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {/* Text Block */}
                  <div
                    className={`w-full lg:w-1/2 flex flex-col justify-center px-6 py-10 md:py-16 lg:py-0 ${isEven ? "lg:pr-16 xl:pr-32 lg:pl-16" : "lg:pl-16 xl:pl-32 lg:pr-16"}`}
                  >
                    <span className="text-sm tracking-widest uppercase font-mono text-brand-blue mb-6 block">
                      0{i + 1}
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-charcoal-900 mb-5 md:mb-8 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-base md:text-xl text-warm-600 leading-relaxed font-light mb-8 md:mb-12 max-w-xl">
                      {service.shortDescription}
                    </p>

                    {service.slug && (
                      <Link
                        href={`/services/${typeof service.slug === "string" ? service.slug : service.slug.current}`}
                        className="inline-flex items-center gap-4 text-xs tracking-widest uppercase font-mono text-brand-blue border-b border-brand-blue pb-2 w-fit hover:text-brand-blue-dark hover:border-brand-blue-dark transition-colors group/link"
                      >
                        {t("view_details")}
                        <span className="group-hover/link:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </section>

        <ProcessTimeline />

        {/* Technology & Transparency (Client Experience) */}
        <section className="bg-charcoal-900 py-14 md:py-32 text-white overflow-hidden relative">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1636690598890-e5e52e4a26c8?q=80&w=2070&auto=format&fit=crop"
                    alt="Technology and blueprint review"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-900/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg">
                    <p className="font-mono text-xs tracking-widest uppercase text-warm-300 mb-2">
                      {t("tech.portal")}
                    </p>
                    <p className="text-sm font-light">
                      {t("tech.portal_desc")}
                    </p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <span className="text-brand-blue/80 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
                    {t("tech.eyebrow")}
                  </span>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-6 md:mb-8 leading-tight">
                    {t("tech.title_1")} <br />
                    <span className="text-brand-blue/60 italic font-light">
                      {t("tech.title_2")}
                    </span>
                  </h2>
                  <p className="text-base md:text-xl font-light text-warm-100/70 mb-6 md:mb-8 leading-relaxed">
                    {t("tech.desc")}
                  </p>
                  <ul className="space-y-4">
                    {[
                      t("tech.list_1"),
                      t("tech.list_2"),
                      t("tech.list_3"),
                      t("tech.list_4"),
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full border border-brand-blue/60 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="block w-1.5 h-1.5 bg-brand-blue rounded-full" />
                        </div>
                        <span className="text-lg font-light text-warm-50">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="bg-cream-100 py-16 md:py-32 border-t border-warm-200">
          <div className="container mx-auto px-6 max-w-7xl">
            <AnimatedSection className="flex flex-col items-center justify-center text-center mb-12 md:mb-28">
              <span className="text-brand-blue font-mono text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
                <div className="w-8 h-px bg-brand-blue" />
                {t("quality.eyebrow")}
                <div className="w-8 h-px bg-brand-blue" />
              </span>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-display text-charcoal-900 leading-[1.1] max-w-4xl">
                {t("quality.title_1")} <br />
                <span className="italic font-light text-brand-blue">
                  {t("quality.title_2")}
                </span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => {
                const title = t(`quality.items.${i}.title` as any);
                const desc = t(`quality.items.${i}.desc` as any);
                return (
                  <AnimatedSection
                    key={i}
                    delay={i * 100}
                    className="relative group h-full"
                  >
                    <div className="h-full px-8 py-16 bg-white hover:bg-charcoal-900 transition-colors duration-700 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-2xl">
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-warm-500 transition-colors duration-700 opacity-0 group-hover:opacity-100 m-6" />

                      {/* Minimalist Icon / Number */}
                      <div className="w-20 h-20 mb-10 rounded-full border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:border-brand-blue group-hover:text-brand-blue transition-colors duration-700 text-center pl-1">
                        <span className="font-mono text-xl tracking-[0.2em] leading-none">
                          0{i + 1}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-display mb-6 text-charcoal-900 group-hover:text-white transition-colors duration-700">
                        {title}
                      </h3>

                      <p className="text-charcoal-600 font-light text-lg leading-relaxed group-hover:text-warm-100/80 transition-colors duration-700 max-w-sm">
                        {desc}
                      </p>

                      {/* Bottom Line */}
                      <div className="w-12 h-px bg-brand-blue/30 group-hover:bg-brand-blue transition-colors duration-700 mt-10" />
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        <FAQSection />

        {/* Final CTA */}
        <section className="bg-charcoal-900 py-16 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-charcoal-900/90 z-10" />
            <Image
              src="https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=2000&auto=format"
              alt="Luxury interior"
              fill
              className="object-cover mix-blend-overlay opacity-30 grayscale"
            />
          </div>
          <div className="container mx-auto px-6 relative z-20 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-7xl font-display text-white mb-6 md:mb-8">
                {t("cta.title_1")} <br />
                <span className="text-warm-200 italic font-light">
                  {t("cta.title_2")}
                </span>
              </h2>
              <p className="text-base md:text-xl font-light text-warm-100/70 mb-8 md:mb-12 max-w-2xl mx-auto">
                {t("cta.desc")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-4 bg-brand-blue text-white px-10 py-5 text-sm uppercase tracking-[0.2em] font-mono hover:bg-brand-blue-dark transition-colors duration-300"
              >
                {t("cta.btn")}
                <span>→</span>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
