import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { sanityFetch, serviceBySlugQuery, allServiceSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirm.com";

type Service = {
  _id: string;
  title: string;
  slug: { current: string };
  icon?: string;
  shortDescription?: string;
  fullDescription?: PortableTextBlock[];
  coverImage?: any;
  keyDeliverables?: string[];
  gallery?: Array<{ asset?: { _ref: string }; alt?: string; caption?: string; url?: string }>;
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<Array<{ slug: string }>>({
      query: allServiceSlugsQuery,
      tags: ["service"],
    });
    if (slugs.length === 0) throw new Error();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [
      { slug: "custom-architecture" },
      { slug: "construction-management" },
      { slug: "high-end-renovation" },
      { slug: "interior-design" },
    ];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const service = await sanityFetch<Service>({
      query: serviceBySlugQuery,
      params: { slug },
      tags: [`service-${slug}`],
    });
    if (!service) return {};

    const imageUrl = service.coverImage?.asset?._ref
      ? urlFor(service.coverImage).width(1200).height(630).auto("format").url()
      : undefined;

    return {
      title: `${service.title} | Vertex Build Group`,
      description: service.shortDescription,
      openGraph: {
        title: `${service.title} | Vertex Build Group`,
        description: service.shortDescription,
        images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      },
    };
  } catch {
    return {};
  }
}

// Fallbacks inline for dynamic route mapping preview
const FALLBACK_DETAIL: Record<string, any> = {
  "custom-architecture": {
    title: "Custom Architecture",
    shortDescription: "Complete architectural design from concept through construction documents, tailored to your vision and site.",
    fullDescription: undefined,
    keyDeliverables: ["Site Analysis & Zoning", "Schematic Design", "Design Development", "Construction Documents", "Bidding & Negotiation"],
    coverImage: { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&auto=format" }
  },
  "construction-management": {
    title: "Construction Management",
    shortDescription: "Full-service luxury execution — new builds and major structural developments with uncompromising quality.",
    fullDescription: undefined,
    keyDeliverables: ["Pre-Construction Cost Estimating", "Critical Path Scheduling", "Subcontractor Selection", "On-Site Supervision", "Project Closeout"],
    coverImage: { url: "https://images.unsplash.com/photo-1541888081198-bc4a7e9da1ca?w=2000&auto=format" }
  },
  "high-end-renovation": {
    title: "High-End Renovation",
    shortDescription: "Surgical renovations that preserve foundational architecture while elevating function, finish, and livability.",
    fullDescription: undefined,
    keyDeliverables: ["Structural Feasibility", "Demolition Planning", "Historical Preservation", "MEP Updates", "Finish Enhancements"],
    coverImage: { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=2000&auto=format" }
  },
  "interior-design": {
    title: "Interior Design",
    shortDescription: "Space planning, finish specification, furniture procurement, and art curation for the full interior experience.",
    fullDescription: undefined,
    keyDeliverables: ["Space Planning", "Material & Finish Sourcing", "Custom Millwork Design", "Furniture Procurement", "Art Selection & Styling"],
    coverImage: { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&auto=format" }
  }
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  let service: Service | null = null;
  try {
    service = await sanityFetch<Service>({
      query: serviceBySlugQuery,
      params: { slug },
      tags: [`service-${slug}`],
    });
  } catch {
    // CMS not connected
  }

  if (!service && FALLBACK_DETAIL[slug]) {
    service = FALLBACK_DETAIL[slug] as any;
  }

  if (!service) {
    notFound();
  }

  // Use URL helper if Sanity asset exists, otherwise raw string, otherwise fallback solid color
  const coverUrl = service?.coverImage?.asset?._ref
    ? urlFor(service.coverImage).width(2000).height(1000).auto("format").url()
    : (service as any)?.coverImage?.url || "https://images.unsplash.com/photo-1600607687920-4e4d3e45c1b1?w=2000&auto=format";

  const galleryImages = service?.gallery?.map(img => ({
    url: img.asset?._ref ? urlFor(img).width(1600).height(1200).auto("format").url() : img.url || "",
    alt: img.alt,
    caption: img.caption
  })).filter(img => img.url) || [];

  return (
    <>
      <Nav />
      <main className="bg-cream-50 pt-16">
        
        {/* HERO HEADER */}
        <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-charcoal-900 group">
          <div className="absolute inset-0">
            <Image
              src={coverUrl}
              alt={service?.title || "Service"}
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[15s] ease-out"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-transparent" />
          
          <div className="absolute bottom-16 left-0 right-0 z-10">
            <div className="container mx-auto px-6">
              <AnimatedSection>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 text-warm-300 hover:text-white transition-colors uppercase tracking-widest text-xs font-mono mb-8 group/back"
                >
                  <ArrowLeft size={14} className="group-hover/back:-translate-x-1 transition-transform" />
                  All Services
                </Link>
                <h1 className="text-display-lg md:text-[6rem] font-display text-white mb-6 leading-none">
                  {service?.title}
                </h1>
                <p className="text-warm-200 text-lg md:text-2xl font-light max-w-2xl leading-relaxed">
                  {service?.shortDescription}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CONTENT & DELIVERABLES */}
        <section className="container mx-auto py-24 md:py-32 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Description */}
            <div className="lg:col-span-8">
              <AnimatedSection>
                <div className="prose prose-stone prose-lg md:prose-xl max-w-none text-charcoal-700 leading-relaxed font-light">
                  {service?.fullDescription ? (
                     <PortableText value={service.fullDescription} />
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
                   {service?.keyDeliverables && service.keyDeliverables.length > 0 ? (
                      <ul className="space-y-6">
                        {service.keyDeliverables.map((item, index) => (
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
                 Schedule a discovery phase with our {service?.title.toLowerCase()} specialists.
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
