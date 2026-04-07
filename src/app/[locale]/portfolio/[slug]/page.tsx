import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Calendar, ChevronDown, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { db } from "@/lib/db";
import { getLocale, getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dhengineering.com";

// Engineering scope items ordered for display
const SCOPE_LABELS: Record<string, string> = {
  "structural-engineering": "Structural Engineering",
  "mep-engineering": "MEP Engineering",
  "building-recertifications": "Building Recertifications",
  "structural-inspections": "Structural Inspections",
  "shop-drawings": "Shop Drawings",
  "permitting": "Permitting & Compliance",
  "as-built": "As-Built Evaluations",
};

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await db.project.findUnique({ where: { slug } }) as any;
  if (!project) return {};

  const title = locale === "es" && project.titleEs ? project.titleEs : project.title;
  const description =
    (locale === "es" && project.descriptionEs ? project.descriptionEs : project.description)
      ?.slice(0, 160) || `${title} — Engineering project by DH Engineering & Consulting LLC.`;
  const imageUrl = project.coverImage || "";

  return {
    title: `${title} | DH Engineering & Consulting LLC`,
    description,
    openGraph: {
      title: `${title} | DH Engineering & Consulting LLC`,
      description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | DH Engineering`,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  // Fetch current project + prev/next in one go
  const [projectRecord, allProjects] = await Promise.all([
    db.project.findUnique({ where: { slug } }),
    db.project.findMany({
      orderBy: { order: "asc" },
      select: { id: true, slug: true, title: true, titleEs: true, coverImage: true, location: true },
    }),
  ]);

  if (!projectRecord) notFound();

  const locale = await getLocale();
  const t = await getTranslations("ProjectDetail");

  const rawProject = projectRecord as any;

  const project = {
    ...projectRecord,
    title: locale === "es" && rawProject.titleEs ? rawProject.titleEs : rawProject.title,
    description: locale === "es" && rawProject.descriptionEs ? rawProject.descriptionEs : rawProject.description,
    projectType: locale === "es" && rawProject.projectTypeEs ? rawProject.projectTypeEs : rawProject.projectType,
    location: locale === "es" && rawProject.locationEs ? rawProject.locationEs : rawProject.location,
    technicalSheet: locale === "es" && rawProject.technicalSheetEs ? rawProject.technicalSheetEs : rawProject.technicalSheet,
    materials: locale === "es" && rawProject.materialsEs ? rawProject.materialsEs : rawProject.materials,
    testimonial: locale === "es" && rawProject.testimonialEs ? rawProject.testimonialEs : rawProject.testimonial,
  };

  // Prev / Next navigation
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];
  const showPrevNext = allProjects.length > 1;

  const coverUrl = project.coverImage || "";

  // Schema — using CreativeWork (valid) instead of generic "Project"
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: `${SITE_URL}/portfolio/${slug}`,
      image: coverUrl,
      dateCreated: project.completionYear ? `${project.completionYear}` : undefined,
      locationCreated: project.location ? { "@type": "Place", name: project.location } : undefined,
      author: {
        "@type": "Organization",
        name: "DH Engineering & Consulting LLC",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Portfolio", item: `${SITE_URL}/portfolio` },
        { "@type": "ListItem", position: 2, name: project.title, item: `${SITE_URL}/portfolio/${slug}` },
      ],
    },
  ];

  const rawGallery = project.gallery ? JSON.parse(project.gallery) : [];
  const galleryImages = rawGallery
    .map((img: any) => ({ url: img.url || "", alt: img.alt, caption: img.caption || "" }))
    .filter((img: any) => img.url);

  const rawTestimonial = project.testimonial ? JSON.parse(project.testimonial) : null;
  // Engineering scope — stored in `materials` JSON array  
  const rawScope: string[] = project.materials ? JSON.parse(project.materials) : [];

  // Technical sheet — render line by line
  const techLines: string[] = project.technicalSheet
    ? project.technicalSheet.split("\n").map((l: string) => l.trim()).filter(Boolean)
    : [];

  const TYPE_LABELS: Record<string, string> = {
    residential: t("types.residential"),
    commercial: t("types.commercial"),
    renovation: t("types.renovation"),
    interior: t("types.interior"),
  };

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Nav />
      <main className="pt-16">
        {/* ── HERO ─────────────────────────────────────── */}
        <div className="relative h-[70vh] md:h-[88vh] w-full overflow-hidden group">
          <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-[12s] ease-out">
            <Image
              src={coverUrl}
              alt={project?.title || "Project"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 via-transparent to-charcoal-900/90" />

          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 md:px-0 pb-16 md:pb-24 z-10">
            <AnimatedSection>
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-warm-400 text-xs font-mono tracking-widest uppercase mb-6">
                <Link href="/portfolio" className="hover:text-brand-blue transition-colors">{t("back")}</Link>
                <span className="text-warm-600">/</span>
                <span className="text-warm-300 truncate max-w-[200px]">{project.title}</span>
              </nav>

              <h1 className="text-4xl md:text-display-lg font-display text-white drop-shadow-lg mb-5">
                {project.title || "Project Detail"}
              </h1>

              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                {project.location && (
                  <p className="text-warm-300 text-sm flex items-center gap-2 font-mono uppercase tracking-wide">
                    <MapPin size={14} className="text-brand-blue" /> {project.location}
                  </p>
                )}
                {project.completionYear && (
                  <p className="text-warm-300 text-sm flex items-center gap-2 font-mono uppercase tracking-wide">
                    <Calendar size={14} className="text-brand-blue" /> {project.completionYear}
                  </p>
                )}
                {project.projectType && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue bg-brand-blue/15 border border-brand-blue/30 px-3 py-1">
                    {TYPE_LABELS[rawProject.projectType] || rawProject.projectType}
                  </span>
                )}
              </div>
            </AnimatedSection>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
            <ChevronDown size={28} strokeWidth={1} />
          </div>
        </div>

        {/* ── CONTENT ──────────────────────────────────── */}
        <section className="container mx-auto py-20 px-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
            {/* Left: Narrative + Gallery */}
            <div className="col-span-1 md:col-span-8 lg:pr-16 order-last md:order-first">
              <AnimatedSection>
                <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-brand-blue mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-brand-blue" />{t("vision")}
                </h2>
                {project?.description && (
                  <div className="prose prose-stone prose-lg max-w-none text-charcoal-700 leading-relaxed font-light mb-16 whitespace-pre-line">
                    <p>{project.description}</p>
                  </div>
                )}
              </AnimatedSection>

              {/* Video embed */}
              {rawProject?.videoUrl && (
                <AnimatedSection className="mt-16" delay={100}>
                  <div className="relative aspect-video overflow-hidden border border-brand-blue/15 shadow-xl group">
                    <iframe
                      src={rawProject.videoUrl.replace("watch?v=", "embed/")}
                      className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </AnimatedSection>
              )}

              {/* Gallery */}
              <AnimatedSection delay={200}>
                <GalleryLightbox images={galleryImages} />
              </AnimatedSection>

              {/* Testimonial */}
              {rawTestimonial?.quote && (
                <AnimatedSection delay={300} className="mt-24 mb-12">
                  <blockquote className="relative p-10 md:p-14 bg-brand-blue/5 border border-brand-blue/15 overflow-hidden">
                    <Quote className="absolute -top-4 -left-4 text-brand-blue/20 w-32 h-32 opacity-30 select-none" />
                    <p className="relative z-10 text-xl md:text-3xl text-charcoal-900 font-display italic leading-snug mb-8">
                      &quot;{rawTestimonial.quote}&quot;
                    </p>
                    <footer className="relative z-10 text-brand-blue font-mono text-sm tracking-widest uppercase">
                      — {rawTestimonial.author}
                    </footer>
                  </blockquote>
                </AnimatedSection>
              )}
            </div>

            {/* Right: Sidebar */}
            <aside className="col-span-1 md:col-span-4" aria-label="Project details">
              <div className="md:sticky md:top-32">
                <AnimatedSection delay={100}>
                  <div className="bg-charcoal-900 text-white p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-bl-full" />

                    <h3 className="text-brand-blue/60 uppercase tracking-widest text-xs font-mono mb-8 border-b border-brand-blue/20 pb-4 relative z-10">
                      {t("dossier")}
                    </h3>

                    <dl className="space-y-6 relative z-10">
                      {/* Project Type */}
                      {rawProject.projectType && (
                        <div>
                          <dt className="text-[10px] text-brand-blue/40 uppercase tracking-widest mb-1 font-mono">{t("type_label")}</dt>
                          <dd className="text-sm text-cream-100">{TYPE_LABELS[rawProject.projectType] || rawProject.projectType}</dd>
                        </div>
                      )}

                      {/* Location */}
                      {project.location && (
                        <div>
                          <dt className="text-[10px] text-brand-blue/40 uppercase tracking-widest mb-1 font-mono">{t("location_label")}</dt>
                          <dd className="text-sm text-cream-100 flex items-center gap-2">
                            <MapPin size={12} className="text-brand-blue shrink-0" />{project.location}
                          </dd>
                        </div>
                      )}

                      {/* Completion Year */}
                      {project.completionYear && (
                        <div>
                          <dt className="text-[10px] text-brand-blue/40 uppercase tracking-widest mb-1 font-mono">{t("year_label")}</dt>
                          <dd className="text-sm text-cream-100">{project.completionYear}</dd>
                        </div>
                      )}

                      {/* Technical Sheet — each line as a row */}
                      {techLines.length > 0 && (
                        <div className="pt-4 mt-2 border-t border-white/10">
                          <dt className="text-[10px] text-brand-blue/40 uppercase tracking-widest mb-3 font-mono">Project Data</dt>
                          <dd>
                            <ul className="space-y-2">
                              {techLines.map((line, i) => {
                                const [label, ...rest] = line.split(":");
                                const value = rest.join(":").trim();
                                return (
                                  <li key={i} className="flex justify-between gap-3 text-xs leading-relaxed">
                                    {value ? (
                                      <>
                                        <span className="text-warm-400 font-mono">{label.trim()}</span>
                                        <span className="text-cream-100 text-right">{value}</span>
                                      </>
                                    ) : (
                                      <span className="text-cream-100">{line}</span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </dd>
                        </div>
                      )}

                      {/* Engineering Scope / Services applied */}
                      {rawScope.length > 0 && (
                        <div className="pt-4 mt-2 border-t border-white/10">
                          <dt className="text-[10px] text-brand-blue/40 uppercase tracking-widest mb-3 font-mono">{t("scope_label")}</dt>
                          <dd>
                            <ul className="space-y-2">
                              {rawScope.map((scope: string, idx: number) => (
                                <li key={idx} className="flex items-center gap-2 text-xs text-cream-100">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                                  {SCOPE_LABELS[scope] || scope}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-10 pt-8 border-t border-white/10 relative z-10">
                      <Link
                        href="/contact"
                        className="inline-block w-full bg-brand-blue text-white border border-brand-blue text-center py-4 text-xs uppercase tracking-widest hover:bg-brand-blue-dark transition-colors duration-300 font-mono group"
                      >
                        <span className="group-hover:-translate-y-0.5 inline-block transition-transform duration-300">
                          {t("inquire")}
                        </span>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </aside>
          </div>
        </section>

        {/* ── PREV / NEXT NAVIGATION ───────────────────── */}
        {showPrevNext && (
          <section className="bg-charcoal-900 border-t border-charcoal-800" aria-label="Project navigation">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-blue/20">
              {/* Prev */}
              <Link
                href={`/portfolio/${prevProject.slug}`}
                className="group relative flex flex-col justify-end overflow-hidden min-h-[280px] md:min-h-[360px] p-8 md:p-12 border-t-2 border-transparent hover:border-brand-blue transition-colors duration-500"
              >
                {prevProject.coverImage && (
                  <Image
                    src={prevProject.coverImage}
                    alt={prevProject.title}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-charcoal-900/10" />
                <div className="relative z-10 w-full">
                  <div className="flex justify-start mb-6">
                    <span className="text-brand-blue uppercase tracking-[0.2em] text-xs font-mono flex items-center gap-4">
                      <ArrowLeft size={14} strokeWidth={1.5} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
                      {t("prev_project")}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-white group-hover:text-brand-blue transition-colors duration-300 leading-tight">
                    {locale === "es" && (prevProject as any).titleEs ? (prevProject as any).titleEs : prevProject.title}
                  </h3>
                  {prevProject.location && (
                    <p className="text-warm-400 text-xs font-mono uppercase tracking-widest mt-3 flex items-center gap-2">
                       {prevProject.location}
                    </p>
                  )}
                </div>
              </Link>

              {/* Next */}
              <Link
                href={`/portfolio/${nextProject.slug}`}
                className="group relative flex flex-col justify-end overflow-hidden min-h-[280px] md:min-h-[360px] p-8 md:p-12 md:items-end md:text-right border-t-2 border-transparent hover:border-brand-blue transition-colors duration-500"
              >
                {nextProject.coverImage && (
                  <Image
                    src={nextProject.coverImage}
                    alt={nextProject.title}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-charcoal-900/10" />
                <div className="relative z-10 w-full flex flex-col md:items-end">
                  <div className="flex md:justify-end mb-6 w-full">
                    <span className="text-brand-blue uppercase tracking-[0.2em] text-xs font-mono flex items-center gap-4">
                      {t("next_project")}
                      <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-white group-hover:text-brand-blue transition-colors duration-300 leading-tight">
                    {locale === "es" && (nextProject as any).titleEs ? (nextProject as any).titleEs : nextProject.title}
                  </h3>
                  {nextProject.location && (
                    <p className="text-warm-400 text-xs font-mono uppercase tracking-widest mt-3 flex items-center gap-2 md:justify-end">
                      {nextProject.location}
                    </p>
                  )}
                </div>
              </Link>
            </div>

            {/* View all link */}
            <div className="border-t border-brand-blue/20">
              <AnimatedSection>
                <Link href="/portfolio" className="block py-16 group relative overflow-hidden text-center container mx-auto px-6">
                  <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors duration-500" />
                  
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="w-12 h-px bg-brand-blue/40 mb-6 transition-all duration-500 group-hover:w-24 group-hover:bg-brand-blue" />
                    <p className="text-warm-400 uppercase tracking-[0.2em] text-[10px] mb-4 font-mono">{t("continue")}</p>
                    <h2 className="text-3xl md:text-5xl font-display text-white transition-colors duration-300 flex items-center justify-center gap-4">
                      <span className="group-hover:text-brand-blue/90 transition-colors duration-300">View All Projects</span>
                      <div className="w-10 h-10 rounded-full border border-brand-blue/30 flex items-center justify-center group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-500">
                        <ArrowRight className="text-brand-blue group-hover:text-charcoal-900 group-hover:translate-x-0.5 transition-all duration-500 w-4 h-4" strokeWidth={2} />
                      </div>
                    </h2>
                  </div>
                </Link>
              </AnimatedSection>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
