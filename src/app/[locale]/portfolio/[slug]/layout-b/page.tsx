import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { db } from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirm.com";

const TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  renovation: "Renovation",
  interior: "Interior Design",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await db.project.findMany({ select: { slug: true } });
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findUnique({ where: { slug } });
  if (!project) return {};

  const imageUrl = project.coverImage || "";

  return {
    title: `${project.title} (Layout B) | Vertex Build Group`,
    description: project.description,
  };
}

export default async function ProjectLayoutBPage({ params }: Props) {
  const { slug } = await params;

  const project = await db.project.findUnique({ where: { slug } });

  if (!project) {
    notFound();
  }

  const coverUrl = project.coverImage || "https://images.unsplash.com/photo-1600607687920-4e4d3e45c1b1?w=2000&auto=format";

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
      <Nav />
      {/* 
        NEW LAYOUT B: Editorial Magazine Style
        - Full screen hero
        - Horizontal Data Banner
        - Centered Content
        - Wide Gallery
      */}
      <main className="pt-16 bg-cream-50">
        
        {/* HERO SECTION */}
        <div className="relative h-[85vh] w-full overflow-hidden group">
          <div className="absolute inset-0">
            <Image
              src={coverUrl}
              alt={project.title || "Project"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-charcoal-900/40" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
            <AnimatedSection>
              <h1 className="text-display-xl lg:text-[7rem] font-display text-white drop-shadow-2xl mb-6">
                {project.title}
              </h1>
              <p className="text-white/80 text-lg md:text-xl uppercase tracking-[0.3em] font-mono">
                {project.location} {project.completionYear ? `— ${project.completionYear}` : ""}
              </p>
            </AnimatedSection>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
            <ChevronDown size={32} strokeWidth={1} />
          </div>
        </div>
        
        {/* HORIZONTAL DATA BANNER */}
        <section className="bg-charcoal-900 text-white py-12 md:py-16">
           <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-charcoal-700">
                 
                 <div className="pl-0 md:pl-8 first:pl-0 pt-4 md:pt-0 first:pt-0">
                    <dt className="text-xs text-warm-500 uppercase tracking-widest mb-2 font-mono">Area Detail</dt>
                    <dd className="text-xl font-display whitespace-pre-line">{project.technicalSheet || "—"}</dd>
                 </div>
                 
                 <div className="pl-0 md:pl-8 pt-4 md:pt-0">
                    <dt className="text-xs text-warm-500 uppercase tracking-widest mb-2 font-mono">Type</dt>
                    <dd className="text-2xl font-display">{project.projectType ? TYPE_LABELS[project.projectType] : "—"}</dd>
                 </div>
                 
                 <div className="pl-0 md:pl-8 pt-4 md:pt-0">
                    <dt className="text-xs text-warm-500 uppercase tracking-widest mb-2 font-mono">Location</dt>
                    <dd className="text-2xl font-display">{project.location || "—"}</dd>
                 </div>

              </div>
           </div>
        </section>

        {/* CENTERED EDITORIAL CONTENT */}
        <section className="container mx-auto max-w-4xl py-24 md:py-32 px-6">
          
          {/* Intro Text */}
          <AnimatedSection>
            {project.description ? (
              <div className="prose prose-stone prose-lg md:prose-xl mx-auto text-charcoal-700 leading-relaxed font-light text-center whitespace-pre-line">
                <p>{project.description}</p>
              </div>
            ) : (
              <div className="text-xl md:text-2xl text-charcoal-600 font-light leading-relaxed text-center">
                <p>Exceptional attention to detail and uncompromising quality define this luxury project. We pushed the boundaries of modern architecture to deliver a space that is both visually stunning and highly functional.</p>
              </div>
            )}
          </AnimatedSection>

          {/* Testimonial Section */}
          {rawTestimonial && rawTestimonial.quote && (
            <AnimatedSection delay={200} className="mb-16">
              <blockquote className="p-8 md:p-12 bg-white border border-warm-200 shadow-sm relative">
                <p className="relative z-10 text-xl md:text-2xl text-charcoal-900 font-display italic leading-relaxed mb-6">
                  &quot;{rawTestimonial.quote}&quot;
                </p>
                <footer className="relative z-10 text-warm-500 font-mono text-xs tracking-widest uppercase">
                  — {rawTestimonial.author}
                </footer>
              </blockquote>
            </AnimatedSection>
          )}

          {/* Materials */}
          {rawMaterials && rawMaterials.length > 0 && (
            <AnimatedSection delay={100} className="mb-24">
              <div className="border border-warm-200 p-10 md:p-14 text-center bg-white shadow-sm">
                <h3 className="text-sm font-mono uppercase tracking-widest text-warm-500 mb-8 border-b border-warm-200 pb-4 inline-block">Sourced Materials</h3>
                <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                  {rawMaterials.map((mat: any, idx: number) => (
                    <li key={idx} className="text-lg text-charcoal-800 font-display">
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}

          {/* Video */}
          {project?.videoUrl && (
            <AnimatedSection delay={200} className="mb-16">
              <div className="relative aspect-video w-full overflow-hidden shadow-2xl">
                <iframe 
                  src={project.videoUrl.replace("watch?v=", "embed/")} 
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              </div>
            </AnimatedSection>
          )}

        </section>

        {/* FULL WIDTH GALLERY */}
        <section className="bg-white py-24 md:py-32 border-t border-warm-200">
           <div className="container mx-auto px-6">
              <AnimatedSection className="mb-16 text-center">
                 <h2 className="text-display-md font-display text-charcoal-900">Project Gallery</h2>
                 <div className="w-12 h-px bg-warm-400 mx-auto mt-6" />
              </AnimatedSection>
              <GalleryLightbox images={galleryImages} />
           </div>
        </section>

        {/* Links Footer */}
        <div className="bg-charcoal-900 border-t border-charcoal-800 text-center py-20">
             <Link href="/portfolio" className="inline-block border border-warm-500 text-warm-500 px-10 py-4 uppercase tracking-widest text-sm font-mono hover:bg-warm-500 hover:text-charcoal-900 transition-colors">
                Back to Portfolio
             </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
