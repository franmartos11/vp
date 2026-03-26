import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { db } from "@/lib/db";
import { getLocale, getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirm.com";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export const revalidate = 60;


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = (await db.service.findUnique({ where: { slug } })) as any;
  if (!service) return {};

  const title =
    locale === "es" && service.titleEs ? service.titleEs : service.title;
  const description =
    locale === "es" && service.shortDescriptionEs
      ? service.shortDescriptionEs
      : service.shortDescription;

  const imageUrl = service.coverImage || "";

  return {
    title: `${title} | Vertex Build Group`,
    description: description || "",
    openGraph: {
      title: `${title} | Vertex Build Group`,
      description: description || "",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const serviceRecord = (await db.service.findUnique({
    where: { slug },
  })) as any;

  if (!serviceRecord) {
    notFound();
  }

  const locale = await getLocale();
  const t = await getTranslations("ServiceDetail");

  const service = {
    ...serviceRecord,
    title:
      locale === "es" && serviceRecord.titleEs
        ? serviceRecord.titleEs
        : serviceRecord.title,
    shortDescription:
      locale === "es" && serviceRecord.shortDescriptionEs
        ? serviceRecord.shortDescriptionEs
        : serviceRecord.shortDescription,
    fullDescription:
      locale === "es" && serviceRecord.fullDescriptionEs
        ? serviceRecord.fullDescriptionEs
        : serviceRecord.fullDescription,
    keyDeliverables:
      locale === "es" && serviceRecord.keyDeliverablesEs
        ? serviceRecord.keyDeliverablesEs
        : serviceRecord.keyDeliverables,
  };

  // Fetch some projects for proof of work
  const rawProjects = (await db.project.findMany({
    take: 2,
    orderBy: { order: "asc" },
  })) as any[];
  const featuredProjects = rawProjects.map((p) => ({
    ...p,
    title: locale === "es" && p.titleEs ? p.titleEs : p.title,
    projectType:
      locale === "es" && p.projectTypeEs ? p.projectTypeEs : p.projectType,
  }));

  const coverUrl =
    service.coverImage ||
    "https://images.unsplash.com/photo-1600607687920-4e4d3e45c1b1?w=2000&auto=format";

  const rawGallery = service.gallery ? JSON.parse(service.gallery) : [];
  const galleryImages =
    rawGallery
      .map((img: any) => ({
        url: img.url || "",
        alt: img.alt,
        caption: "",
      }))
      .filter((img: any) => img.url) || [];

  const rawDeliverables = service.keyDeliverables
    ? JSON.parse(service.keyDeliverables)
    : [];

  return (
    <>
      <Nav />
      <main className="bg-cream-50 pt-16">
        {/* HERO HEADER */}
        <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-charcoal-900 group">
          <div className="absolute inset-0">
            <Image
              src={coverUrl}
              alt={service.title || "Service"}
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[20s] ease-out mix-blend-luminosity grayscale"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end pb-24 pt-32 container mx-auto px-6 z-10 transition-all">
            <AnimatedSection>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 text-warm-300 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs font-mono mb-12 group/back border-b border-transparent hover:border-warm-300 pb-1 w-fit"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover/back:-translate-x-1 transition-transform"
                />
                {t("return")}
              </Link>
              <h1 className="text-5xl md:text-display-lg lg:text-[7rem] font-display text-white mb-8 leading-[0.9] drop-shadow-xl max-w-6xl">
                {service.title}
              </h1>
              <p className="text-warm-100/80 text-xl md:text-2xl font-light max-w-3xl leading-relaxed">
                {service.shortDescription}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* AT-A-GLANCE METRICS STRIP */}
        <section className="bg-charcoal-800 border-y border-warm-800/30 text-white relative z-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-warm-800/30 font-mono tracking-widest uppercase text-xs">
              <div className="py-8 md:px-8 flex flex-col gap-2 justify-center">
                <span className="text-warm-500/70 text-[10px]">
                  {t("timeline")}
                </span>
                <span className="text-warm-100 text-sm">
                  {t("timeline_val")}
                </span>
              </div>
              <div className="py-8 md:px-8 flex flex-col gap-2 justify-center">
                <span className="text-warm-500/70 text-[10px]">
                  {t("investment")}
                </span>
                <span className="text-warm-100 text-sm">
                  {t("investment_val")}
                </span>
              </div>
              <div className="py-8 md:px-8 flex flex-col gap-2 justify-center">
                <span className="text-warm-500/70 text-[10px]">
                  {t("ideal")}
                </span>
                <span className="text-warm-100 text-sm">{t("ideal_val")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT & DELIVERABLES */}
        <section className="container mx-auto py-24 md:py-40 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left: Description (Editorial Style) */}
            <div className="lg:col-span-7 xl:col-span-8">
              <AnimatedSection>
                <div className="prose prose-stone prose-lg md:prose-xl max-w-none text-charcoal-700 leading-relaxed font-light whitespace-pre-line first-letter:text-5xl lg:first-letter:text-7xl first-letter:font-display first-letter:text-charcoal-900 first-letter:float-left first-letter:mr-4 lg:first-letter:mr-6 first-letter:-mt-2 first-letter:leading-none">
                  {service.fullDescription ? (
                    <p>{service.fullDescription}</p>
                  ) : (
                    <p>{t("fallback_desc")}</p>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Key Deliverables Sidebar (Luxury Style) */}
            <div className="lg:col-span-5 xl:col-span-4 mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-32 bg-white p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-warm-100">
                <AnimatedSection delay={100}>
                  <h3 className="font-display text-3xl text-charcoal-900 mb-8 pb-6 border-b border-warm-200">
                    {t("deliverables")}{" "}
                    <span className="italic font-light text-warm-600">
                      {t("deliverables_it")}
                    </span>
                  </h3>
                  {rawDeliverables && rawDeliverables.length > 0 ? (
                    <ul className="space-y-8">
                      {rawDeliverables.map((item: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-6 group"
                        >
                          <div className="font-mono text-warm-400 text-sm tracking-widest pt-1 group-hover:text-warm-600 transition-colors">
                            0{index + 1}
                          </div>
                          <span className="text-lg text-charcoal-800 font-light leading-snug group-hover:text-charcoal-900 transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-warm-500 font-light italic">
                      {t("dev_fallback")}
                    </p>
                  )}
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* THE EXACT PROCESS (Service specific timeline) */}
        <section className="bg-charcoal-900 text-white py-32 border-t border-warm-800">
          <div className="container mx-auto px-6 max-w-5xl">
            <AnimatedSection className="text-center mb-24">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-6 block">
                {t("execution")}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight">
                {t("delivery")} <br />
                <span className="text-warm-200 italic font-light">
                  {t("delivery_it")}
                </span>
              </h2>
            </AnimatedSection>

            <div className="space-y-0 text-center md:text-left relative before:absolute before:inset-0 before:ml-auto before:mr-auto md:before:ml-[28px] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-warm-800 before:to-transparent">
              {[0, 1, 2].map((i) => {
                const phase = t(`phases.${i}.phase` as any);
                const title = t(`phases.${i}.title` as any);
                const desc = t(`phases.${i}.desc` as any);
                return (
                  <AnimatedSection
                    key={i}
                    delay={i * 100}
                    className="relative flex flex-col md:flex-row items-center justify-between md:justify-normal md:gap-16 pb-16 last:pb-0 group"
                  >
                    <div className="hidden md:flex flex-shrink-0 w-14 h-14 rounded-full bg-charcoal-900 border-2 border-warm-800 group-hover:border-warm-500 transition-colors duration-500 items-center justify-center z-10 text-warm-500 group-hover:text-warm-400 font-mono">
                      0{i + 1}
                    </div>
                    <div className="md:w-full bg-charcoal-800/30 border border-warm-800/30 p-8 md:p-12 hover:bg-charcoal-800/80 transition-colors duration-500 w-full relative z-10 backdrop-blur-sm">
                      <span className="font-mono text-[10px] tracking-widest text-warm-500 uppercase mb-4 block">
                        {phase}
                      </span>
                      <h4 className="text-2xl md:text-3xl font-display mb-4 text-warm-50">
                        {title}
                      </h4>
                      <p className="text-warm-100/60 font-light leading-relaxed text-lg">
                        {desc}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* RELATED PROJECTS (Proof of Work) */}
        {featuredProjects && featuredProjects.length > 0 && (
          <section className="bg-cream-100 py-32 border-t border-warm-200">
            <div className="container mx-auto px-6 max-w-7xl">
              <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                <div>
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-4 block">
                    {t("proof")}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display text-charcoal-900">
                    {t("results")}{" "}
                    <span className="italic font-light">{t("focus")}</span>
                  </h2>
                </div>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-3 text-charcoal-900 border-b border-charcoal-900 pb-1 font-mono text-xs uppercase tracking-widest hover:text-warm-500 hover:border-warm-500 transition-all"
                >
                  {t("view_portfolio")} <ArrowUpRight size={14} />
                </Link>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                {featuredProjects.map((project, i) => (
                  <AnimatedSection
                    key={project.id}
                    delay={i * 100}
                    className="group cursor-pointer"
                  >
                    <Link href={`/portfolio/${project.slug}`}>
                      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden mb-8">
                        <Image
                          src={
                            project.coverImage ||
                            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
                          }
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out"
                        />
                        <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-transparent transition-colors duration-700" />
                      </div>
                      <h3 className="text-2xl font-display text-charcoal-900 mb-2 group-hover:text-warm-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-warm-500 font-mono text-xs uppercase tracking-widest">
                        {project.projectType || t("default_type")}
                      </p>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GALLERY (IF ANY) */}
        {galleryImages.length > 0 && (
          <section className="bg-white py-24 border-t border-warm-200 px-6">
            <div className="container mx-auto max-w-7xl">
              <AnimatedSection className="mb-12 text-center">
                <h2 className="text-4xl font-display text-charcoal-900 mb-4">
                  {t("gallery_title")}
                </h2>
                <p className="text-warm-500 font-mono text-xs uppercase tracking-[0.3em]">
                  {t("gallery_sub")}
                </p>
              </AnimatedSection>
              <GalleryLightbox images={galleryImages} />
            </div>
          </section>
        )}

        {/* SERVICE FAQ (Static Editorial Style) */}
        <section className="bg-cream-50 py-32 px-6 border-t border-warm-200">
          <div className="container mx-auto max-w-4xl">
            <AnimatedSection className="mb-20 text-center">
              <h2 className="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">
                {t("faq_title")}
              </h2>
              <div className="w-16 h-px bg-warm-400 mx-auto" />
            </AnimatedSection>

            <div className="space-y-16">
              {[0, 1, 2].map((i) => {
                const q = t(`faqs.${i}.q` as any);
                const a = t(`faqs.${i}.a` as any);
                return (
                  <AnimatedSection key={i} delay={i * 100}>
                    <h4 className="text-2xl font-display text-charcoal-900 mb-4">
                      {q}
                    </h4>
                    <p className="text-lg text-charcoal-600 font-light leading-relaxed">
                      {a}
                    </p>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-charcoal-900 py-32 md:py-48 border-t border-warm-800 text-center px-6 relative overflow-hidden">
          {/* Abstract dark texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_100%)]" />
          </div>

          <AnimatedSection className="relative z-10">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-6 block">
              {t("next_step")}
            </span>
            <h2 className="text-display-md md:text-6xl lg:text-7xl font-display text-white mb-8 leading-tight">
              {t("ready")}{" "}
              <span className="italic font-light text-warm-200">
                {t("project")}
              </span>
            </h2>
            <p className="text-warm-100/70 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
              {t("schedule", { service: service.title.toLowerCase() })}
            </p>
            <Link
              href="/contact"
              className="inline-flex py-6 px-12 bg-warm-500 text-charcoal-900 font-mono text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors duration-500 items-center justify-center min-w-[280px]"
            >
              {t("inquire")}
            </Link>
          </AnimatedSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
