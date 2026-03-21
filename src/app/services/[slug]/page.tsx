import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { db } from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirm.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await db.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } });
  if (!service) return {};

  const imageUrl = service.coverImage || "";

  return {
    title: `${service.title} | Vertex Build Group`,
    description: service.shortDescription || "",
    openGraph: {
      title: `${service.title} | Vertex Build Group`,
      description: service.shortDescription || "",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } }) as any;

  if (!service) {
    notFound();
  }

  const coverUrl = service.coverImage || "https://images.unsplash.com/photo-1600607687920-4e4d3e45c1b1?w=2000&auto=format";

  const rawGallery = service.gallery ? JSON.parse(service.gallery) : [];
  const galleryImages = rawGallery.map((img: any) => ({
    url: img.url || "",
    alt: img.alt,
    caption: ""
  })).filter((img: any) => img.url) || [];

  const rawDeliverables = service.keyDeliverables ? JSON.parse(service.keyDeliverables) : [];

  return (
    <>
      <Nav />
      <main className="bg-cream-50 pt-16">
        
        {/* HERO HEADER */}
        <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-charcoal-900 group">
          <div className="absolute inset-0">
            <Image
              src={coverUrl}
              alt={service.title || "Service"}
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[15s] ease-out"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end pb-16 pt-32 container mx-auto px-6 z-10 transition-all">
            <AnimatedSection>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 text-warm-300 hover:text-white transition-colors uppercase tracking-widest text-xs font-mono mb-8 group/back"
              >
                <ArrowLeft size={14} className="group-hover/back:-translate-x-1 transition-transform" />
                All Services
              </Link>
              <h1 className="text-display-lg md:text-[6rem] font-display text-white mb-6 leading-none">
                {service.title}
              </h1>
              <p className="text-warm-200 text-lg md:text-2xl font-light max-w-2xl leading-relaxed">
                {service.shortDescription}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* CONTENT & DELIVERABLES */}
        <section className="container mx-auto py-24 md:py-32 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Description */}
            <div className="lg:col-span-8">
              <AnimatedSection>
                <div className="prose prose-stone prose-lg md:prose-xl max-w-none text-charcoal-700 leading-relaxed font-light whitespace-pre-line">
                  {service.fullDescription ? (
                     <p>{service.fullDescription}</p>
                  ) : (
                     <p>
                       By unifying design and construction, we eliminate the communication gaps that plague traditional project delivery. Our process guarantees that the architectural vision is executed precisely, on schedule, and within the agreed parameters. We act as your single point of responsibility, streamlining the entire journey from the initial sketch to the final walkthrough. Every detail, from structural framing to artisanal finishes, is meticulously coordinated under one roof.
                     </p>   
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Key Deliverables Sidebar */}
            <div className="lg:col-span-4 lg:pl-12 lg:border-l border-warm-200">
               <div className="sticky top-32">
                 <AnimatedSection delay={100}>
                   <h3 className="font-mono text-sm uppercase tracking-widest text-charcoal-900 mb-8 pb-4 border-b border-warm-200">
                     Core Deliverables
                   </h3>
                   {rawDeliverables && rawDeliverables.length > 0 ? (
                      <ul className="space-y-6">
                        {rawDeliverables.map((item: string, index: number) => (
                           <li key={index} className="flex items-start gap-4 group">
                             <div className="w-6 h-6 rounded-full border border-warm-400 flex items-center justify-center bg-cream-100 shrink-0 mt-0.5 group-hover:bg-warm-400 group-hover:border-warm-400 transition-colors">
                               <Check size={12} className="text-charcoal-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <span className="text-lg text-charcoal-800 font-display">{item}</span>
                           </li>
                        ))}
                      </ul>
                   ) : (
                      <p className="text-warm-500 italic">Curated list coming soon.</p>
                   )}
                 </AnimatedSection>
               </div>
            </div>

          </div>
        </section>

        {/* GALLERY (IF ANY) */}
        {galleryImages.length > 0 && (
          <section className="bg-white py-24 border-t border-warm-200 px-6">
             <div className="container mx-auto">
                <AnimatedSection className="mb-12">
                   <h2 className="text-3xl font-display text-charcoal-900 mb-2">Service Gallery</h2>
                   <p className="text-warm-500 font-mono text-xs uppercase tracking-widest">Detail & Execution</p>
                </AnimatedSection>
                <GalleryLightbox images={galleryImages} />
             </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-charcoal-900 py-32 border-t text-center px-6">
           <AnimatedSection>
              <h2 className="text-display-md md:text-5xl font-display text-white mb-8">
                 Ready to begin your project?
              </h2>
              <p className="text-warm-300 text-lg mb-12 max-w-xl mx-auto font-light">
                 Schedule a discovery phase with our {service.title.toLowerCase()} specialists.
              </p>
              <Link 
                href="/contact"
                className="inline-flex py-5 px-10 bg-warm-500 text-charcoal-900 font-mono text-sm uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 items-center gap-3 group"
              >
                 Inquire Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </AnimatedSection>
        </section>

      </main>
      <Footer />
    </>
  );
}
