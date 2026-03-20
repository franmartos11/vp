import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Maximize2, Clock, ChevronDown, Quote } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { sanityFetch, projectBySlugQuery, allProjectSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { FALLBACK_PROJECTS } from "@/lib/fallbackData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirm.com";

const TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  renovation: "Renovation",
  interior: "Interior Design",
};

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  projectType: string;
  completionYear?: number;
  location?: string;
  coverImage: { asset: { _ref: string }; alt?: string };
  gallery?: Array<{ asset?: { _ref: string }; alt?: string; caption?: string; url?: string }>;
  description?: PortableTextBlock[];
  technicalSheet?: {
    squareFootage?: number;
    budget?: string;
    duration?: string;
    client?: string;
    architect?: string;
    awards?: string;
  };
  seoDescription?: string;
  materials?: string[];
  testimonial?: { quote: string; author: string };
  videoUrl?: string;
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<Array<{ slug: string }>>({
      query: allProjectSlugsQuery,
      tags: ["project"],
    });
    if (slugs.length === 0) throw new Error();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return FALLBACK_PROJECTS.map((p) => ({ slug: p.slug.current }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    let project = await sanityFetch<Project>({
      query: projectBySlugQuery,
      params: { slug },
      tags: [`project-${slug}`],
    });
    if (!project) {
      project = FALLBACK_PROJECTS.find(p => p.slug.current === slug) as any;
    }
    if (!project) return {};

    const imageUrl = project.coverImage?.asset?._ref
      ? urlFor(project.coverImage).width(1200).height(630).auto("format").url()
      : (project as any).coverImageUrl;

    return {
      title: project.title,
      description: project.seoDescription || `${project.title} — A ${TYPE_LABELS[project.projectType]} project by Vertex Build Group.`,
      openGraph: {
        title: `${project.title} | Vertex Build Group`,
        description: project.seoDescription,
        images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  let project: Project | null = null;
  try {
    project = await sanityFetch<Project>({
      query: projectBySlugQuery,
      params: { slug },
      tags: [`project-${slug}`],
    });
  } catch {
    // CMS not connected
  }

  if (!project) {
    project = FALLBACK_PROJECTS.find(p => p.slug.current === slug) as any;
  }

  if (!project && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id") {
    notFound();
  }

  const coverUrl = project?.coverImage?.asset?._ref
    ? urlFor(project.coverImage).width(2000).height(1200).auto("format").url()
    : (project as any)?.coverImageUrl || "https://images.unsplash.com/photo-1600607687920-4e4d3e45c1b1?w=2000&auto=format";

  const projectJsonLd = project
    ? {
        "@context": "https://schema.org",
        "@type": "Project",
        name: project.title,
        description: project.seoDescription,
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

  const galleryImages = project?.gallery?.map(img => ({
    url: img.asset?._ref ? urlFor(img).width(1600).height(1200).auto("format").url() : img.url || "",
    alt: img.alt,
    caption: img.caption
  })).filter(img => img.url) || [];

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
              alt={project?.coverImage?.alt || project?.title || "Project"}
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
                className="inline-flex items-center gap-2 text-warm-300 text-sm hover:text-white transition-colors mb-8 uppercase tracking-widest font-mono"
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </Link>
              <h1 className="text-display-lg font-display text-white drop-shadow-lg mb-4">
                {project?.title || "Project Detail"}
              </h1>
              {project?.location && (
                <p className="text-warm-300 text-sm md:text-base flex items-center gap-2 uppercase tracking-wide font-mono">
                  <MapPin size={16} /> {project.location} {project.completionYear ? `— ${project.completionYear}` : ""}
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
            
            {/* Main Content Column */}
            <div className="col-span-1 md:col-span-8">
              
              <AnimatedSection>
                {project?.description ? (
                  <div className="prose prose-stone prose-lg max-w-none text-charcoal-700 leading-relaxed font-light">
                    <PortableText value={project.description} />
                  </div>
                ) : (
                  <div className="text-xl text-charcoal-600 font-light leading-relaxed">
                    <p>Exceptional attention to detail and uncompromising quality define this luxury project. We pushed the boundaries of modern architecture to deliver a space that is both visually stunning and highly functional.</p>
                  </div>
                )}
              </AnimatedSection>

              {/* Video Embded */}
              {project?.videoUrl && (
                <AnimatedSection className="mt-16" delay={100}>
                  <div className="relative aspect-video rounded-sm overflow-hidden border border-warm-200 shadow-xl group">
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
              {project?.testimonial && (
                <AnimatedSection delay={300} className="mt-24 mb-12">
                  <blockquote className="relative p-10 md:p-14 bg-warm-50 border border-warm-200 overflow-hidden">
                    <Quote className="absolute -top-4 -left-4 text-warm-200 w-32 h-32 opacity-30 select-none" />
                    <p className="relative z-10 text-xl md:text-3xl text-charcoal-900 font-display italic leading-snug mb-8">
                      &quot;{project.testimonial.quote}&quot;
                    </p>
                    <footer className="relative z-10 text-warm-500 font-mono text-sm tracking-widest uppercase">
                      — {project.testimonial.author}
                    </footer>
                  </blockquote>
                </AnimatedSection>
              )}

            </div>
            
            {/* Technical Sheet Sidebar */}
            <aside className="col-span-1 md:col-span-4" aria-label="Project details">
              <div className="sticky top-32">
                <AnimatedSection delay={100}>
                  <div className="bg-charcoal-900 text-white p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-warm-500/10 rounded-bl-full" />
                    
                    <h3 className="text-warm-400 uppercase tracking-widest text-xs font-mono mb-8 border-b border-white/20 pb-4 relative z-10">
                      Project Dossier
                    </h3>
                    
                    <dl className="space-y-6 relative z-10">
                      {project?.projectType && (
                        <div>
                          <dt className="text-xs text-warm-500 uppercase tracking-widest mb-1 font-mono">Type</dt>
                          <dd className="text-base text-cream-100">{TYPE_LABELS[project.projectType]}</dd>
                        </div>
                      )}
                      
                      {project?.technicalSheet?.squareFootage && (
                        <div>
                          <dt className="text-xs text-warm-500 uppercase tracking-widest mb-1 flex items-center gap-2 font-mono">
                             <Maximize2 size={12} /> Area
                          </dt>
                          <dd className="text-base text-cream-100">
                             {project.technicalSheet.squareFootage.toLocaleString()} sq ft
                          </dd>
                        </div>
                      )}
                      
                      {project?.technicalSheet?.duration && (
                        <div>
                          <dt className="text-xs text-warm-500 uppercase tracking-widest mb-1 flex items-center gap-2 font-mono">
                             <Clock size={12} /> Duration
                          </dt>
                          <dd className="text-base text-cream-100">{project.technicalSheet.duration}</dd>
                        </div>
                      )}
                      
                      {project?.technicalSheet?.architect && (
                        <div>
                          <dt className="text-xs text-warm-500 uppercase tracking-widest mb-1 font-mono">Architect</dt>
                          <dd className="text-base text-cream-100">{project.technicalSheet.architect}</dd>
                        </div>
                      )}
                      
                      {project?.technicalSheet?.client && (
                        <div>
                          <dt className="text-xs text-warm-500 uppercase tracking-widest mb-1 font-mono">Client</dt>
                          <dd className="text-base text-cream-100">{project.technicalSheet.client}</dd>
                        </div>
                      )}

                      {project?.materials && project.materials.length > 0 && (
                        <div className="pt-4 mt-4 border-t border-white/20">
                          <dt className="text-xs text-warm-500 uppercase tracking-widest mb-3 font-mono">Key Materials</dt>
                          <dd>
                            <ul className="space-y-3">
                              {project.materials.map((mat, idx) => (
                                <li key={idx} className="text-sm text-cream-100 flex items-start gap-3">
                                  <span className="text-warm-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-warm-500 flex-shrink-0" />
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
                        className="inline-block w-full bg-warm-500 text-charcoal-900 border border-warm-500 text-center py-4 text-sm uppercase tracking-widest hover:bg-transparent hover:text-warm-500 transition-colors duration-300 font-medium font-mono group"
                      >
                         <span className="group-hover:-translate-y-0.5 inline-block transition-transform duration-300">Inquire About Project</span>
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
                <div className="absolute inset-0 bg-warm-500/0 group-hover:bg-warm-500/5 transition-colors duration-500" />
                <div className="container mx-auto text-center relative z-10 px-6">
                   <p className="text-warm-500 uppercase tracking-widest text-sm mb-6 font-mono">Continue Exploring</p>
                   <h2 className="text-display-md md:text-display-lg font-display text-white group-hover:text-warm-300 transition-colors duration-300">
                     View All Projects
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
