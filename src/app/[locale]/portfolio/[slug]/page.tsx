import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Maximize2, Clock, ChevronDown, Quote } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { db } from "@/lib/db";
import { getLocale, getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirm.com";

const TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  renovation: "Renovation",
  interior: "Interior Design",
};

interface Props {
  params: Promise<{ slug: string, locale: string }>;
}

export const revalidate = 60;


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await db.project.findUnique({ where: { slug } }) as any;
  if (!project) return {};

  const title = locale === 'es' && project.titleEs ? project.titleEs : project.title;

  const imageUrl = project.coverImage || "";

  return {
    title: title,
    description: `${title} — Project by Vertex Build Group.`,
    openGraph: {
      title: `${title} | Vertex Build Group`,
      description: `${title} — Project by Vertex Build Group.`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const projectRecord = await db.project.findUnique({ where: { slug } });

  if (!projectRecord) {
    notFound();
  }

  const locale = await getLocale();
  const t = await getTranslations("ProjectDetail");
  
  const rawProject = projectRecord as any;

  const project = {
    ...projectRecord,
    title: locale === 'es' && rawProject.titleEs ? rawProject.titleEs : rawProject.title,
    description: locale === 'es' && rawProject.descriptionEs ? rawProject.descriptionEs : rawProject.description,
    projectType: locale === 'es' && rawProject.projectTypeEs ? rawProject.projectTypeEs : rawProject.projectType,
    location: locale === 'es' && rawProject.locationEs ? rawProject.locationEs : rawProject.location,
    technicalSheet: locale === 'es' && rawProject.technicalSheetEs ? rawProject.technicalSheetEs : rawProject.technicalSheet,
    materials: locale === 'es' && rawProject.materialsEs ? rawProject.materialsEs : rawProject.materials,
    testimonial: locale === 'es' && rawProject.testimonialEs ? rawProject.testimonialEs : rawProject.testimonial,
  };

  const coverUrl = project.coverImage || "";

  const projectJsonLd = project
    ? {
        "@context": "https://schema.org",
        "@type": "Project",
        name: project.title,
        description: project.description,
        url: `${SITE_URL}/portfolio/${slug}`,
        image: coverUrl,
        location: project.location
          ? { "@type": "Place", name: project.location }
          : undefined,
        temporalCoverage: project.completionYear?.toString(),
        provider: {
          "@type": "Organization",
          name: "Vertex Build Group",
          url: SITE_URL,
        },
      }
    : null;

  const rawGallery = project.gallery ? JSON.parse(project.gallery) : [];
  const galleryImages = rawGallery.map((img: any) => ({
    url: img.url || "",
    alt: img.alt,
    caption: ""
  })).filter((img: any) => img.url) || [];

  const rawTestimonial = project.testimonial ? JSON.parse(project.testimonial) : null;
  const rawMaterials = project.materials ? JSON.parse(project.materials) : [];

  return (
    <>
      {projectJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        />
      )}
      <Nav />
      <main className="pt-16">
        {/* HERO SECTION */}
        <div className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden group">
          <div className="absolute inset-0 hover:scale-105 transition-transform duration-[10s] ease-out">
            <Image
              src={coverUrl}
              alt={project?.title || "Project"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 via-transparent to-charcoal-900/90" />
          
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 md:px-0 pb-16 md:pb-24 z-10">
            <AnimatedSection>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-warm-300 text-sm hover:text-brand-blue transition-colors mb-8 uppercase tracking-widest font-mono"
              >
                <ArrowLeft size={14} /> {t("back")}
              </Link>
              <h1 className="text-4xl md:text-display-lg font-display text-white drop-shadow-lg mb-4">
                {project.title || "Project Detail"}
              </h1>
              {project.location && (
                <p className="text-warm-300 text-sm md:text-base flex items-center gap-2 uppercase tracking-wide font-mono">
                  <MapPin size={16} className="text-brand-blue" /> {project.location} {project.completionYear ? `— ${project.completionYear}` : ""}
                </p>
              )}
            </AnimatedSection>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <ChevronDown size={32} strokeWidth={1} />
          </div>
        </div>
        
        {/* CONTENT */}
        <section className="container mx-auto py-20 px-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Project Details */}
            <div className="col-span-1 md:col-span-8 lg:pr-16 order-last md:order-first">
              <AnimatedSection>
                <h2 className="text-display-sm font-display text-charcoal-900 mb-8 border-b border-brand-blue/15 pb-6 uppercase tracking-widest text-sm">
                  {t("vision")}
                </h2>
                {project?.description && (
                  <div className="prose prose-stone prose-lg max-w-none text-charcoal-700 leading-relaxed font-light mb-16 whitespace-pre-line">
                    <p>{project.description}</p>
                  </div>
                )}
              </AnimatedSection>

              {/* Video Embded */}
              {project?.videoUrl && (
                <AnimatedSection className="mt-16" delay={100}>
                  <div className="relative aspect-video rounded-sm overflow-hidden border border-brand-blue/15 shadow-xl group">
                    <iframe 
                      src={project.videoUrl.replace("watch?v=", "embed/")} 
                      className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen 
                    />
                  </div>
                </AnimatedSection>
              )}

              {/* Gallery Lightbox Integration */}
              <AnimatedSection delay={200}>
                <GalleryLightbox images={galleryImages} />
              </AnimatedSection>
              
              {/* Testimonial Section */}
              {rawTestimonial && rawTestimonial.quote && (
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
            
            {/* Technical Sheet Sidebar */}
            <aside className="col-span-1 md:col-span-4" aria-label="Project details">
              <div className="md:sticky md:top-32">
                <AnimatedSection delay={100}>
                  <div className="bg-charcoal-900 text-white p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-bl-full" />
                    
                    <h3 className="text-brand-blue/60 uppercase tracking-widest text-xs font-mono mb-8 border-b border-brand-blue/20 pb-4 relative z-10">
                      {t("dossier")}
                    </h3>
                    
                    <dl className="space-y-6 relative z-10">
                      {project.projectType && (
                        <div>
                          <dt className="text-xs text-brand-blue/50 uppercase tracking-widest mb-1 font-mono">{t("type_label")}</dt>
                          <dd className="text-base text-cream-100">{t(`types.${project.projectType}` as any) || project.projectType}</dd>
                        </div>
                      )}
                      
                      {project?.technicalSheet && (
                        <div className="whitespace-pre-line text-sm text-cream-100 mt-6 pt-6 border-t border-white/20">
                          {project.technicalSheet}
                        </div>
                      )}

                      {rawMaterials && rawMaterials.length > 0 && (
                        <div className="pt-4 mt-4 border-t border-white/20">
                          <dt className="text-xs text-brand-blue/50 uppercase tracking-widest mb-3 font-mono">{t("materials_label")}</dt>
                          <dd>
                            <ul className="space-y-3">
                              {rawMaterials.map((mat: any, idx: number) => (
                                <li key={idx} className="text-sm text-cream-100 flex items-start gap-3">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                                  <span>{mat}</span>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}
                    </dl>
                    
                    <div className="mt-12 pt-8 border-t border-white/20 relative z-10">
                      <Link 
                        href="/contact"
                        className="inline-block w-full bg-brand-blue text-white border border-brand-blue text-center py-4 text-sm uppercase tracking-widest hover:bg-brand-blue-dark hover:border-brand-blue-dark transition-colors duration-300 font-medium font-mono group"
                      >
                         <span className="group-hover:-translate-y-0.5 inline-block transition-transform duration-300">{t("inquire")}</span>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </aside>
          </div>
        </section>

        {/* Next Project / CTA Section */}
        <section className="bg-charcoal-900 border-t border-charcoal-800">
           <AnimatedSection>
              <Link href="/portfolio" className="block py-24 group relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors duration-500" />
                <div className="container mx-auto text-center relative z-10 px-6">
                   <p className="text-brand-blue/60 uppercase tracking-widest text-sm mb-6 font-mono">{t("continue")}</p>
                   <h2 className="text-display-md md:text-display-lg font-display text-white group-hover:text-brand-blue/80 transition-colors duration-300">
                     {t("view_all")}
                   </h2>
                </div>
              </Link>
           </AnimatedSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
