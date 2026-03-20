import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FAQSection from "@/components/sections/FAQSection";
import { sanityFetch, allServicesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vertex Build Group offers end-to-end luxury architecture, construction management, renovation, and interior design services across the United States.",
};

type Service = {
  _id: string;
  title: string;
  slug: { current: string };
  icon?: string;
  shortDescription?: string;
  fullDescription?: unknown[];
  coverImage?: any;
  keyDeliverables?: string[];
  order?: number;
};

// Update fallbacks to strictly 4 services with dummy image URLs
const FALLBACK_SERVICES: Service[] = [
  { 
    _id: "1", 
    title: "Custom Architecture", 
    slug: { current: "custom-architecture" }, 
    shortDescription: "Complete architectural design from concept through construction documents, tailored to your vision and site.",
    coverImage: { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format" }
  },
  { 
    _id: "2", 
    title: "Construction Management", 
    slug: { current: "construction-management" }, 
    shortDescription: "Full-service luxury execution — new builds and major structural developments with uncompromising quality.",
    coverImage: { url: "https://images.unsplash.com/photo-1541888081198-bc4a7e9da1ca?w=1600&auto=format" }
  },
  { 
    _id: "3", 
    title: "High-End Renovation", 
    slug: { current: "high-end-renovation" }, 
    shortDescription: "Surgical renovations that preserve foundational architecture while elevating function, finish, and livability.",
    coverImage: { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&auto=format" }
  },
  { 
    _id: "4", 
    title: "Interior Design", 
    slug: { current: "interior-design" }, 
    shortDescription: "Space planning, finish specification, furniture procurement, and art curation for the full interior experience.",
    coverImage: { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&auto=format" }
  },
];

export default async function ServicesPage() {
  let services: Service[] = [];
  try {
    services = await sanityFetch<Service[]>({ query: allServicesQuery, tags: ["service"] });
  } catch { /* CMS not connected */ }

  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <>
      <Nav />
      <main className="bg-cream-50">
        
        {/* Dark Immersive Hero */}
        <section className="relative h-[85vh] w-full overflow-hidden bg-charcoal-900 group mb-24 md:mb-32">
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
                <span className="text-warm-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-8 block flex items-center gap-4">
                  <div className="w-12 h-px bg-warm-400" /> What We Do
                </span>
                <h1 className="text-display-xl lg:text-[7rem] font-display text-white leading-[0.9] mb-8 drop-shadow-2xl">
                  Comprehensive <br />
                  <span className="text-warm-200 italic font-light">expertise.</span>
                </h1>
                <p className="text-warm-300 text-lg md:text-2xl font-light leading-relaxed max-w-2xl">
                  From pre-construction modeling to the final interior finishes, our vertically integrated team ensures total control over quality, budget, and timeline.
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

        {/* Services Zig-Zag Layout */}
        <section className="pb-24 md:pb-32 overflow-hidden">
          {displayServices.map((service, i) => {
            const isEven = i % 2 !== 0; // Alternating logic
            const imageUrl = service.coverImage?.asset?._ref 
              ? urlFor(service.coverImage).width(1200).height(900).auto("format").url() 
              : (service as any).coverImage?.url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format";
            
            return (
              <AnimatedSection key={service._id} delay={i * 100}>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center mb-20 md:mb-32 group`}>
                   
                   {/* Image Block */}
                   <div className="w-full lg:w-1/2 h-[50vh] min-h-[400px] lg:h-[750px] relative overflow-hidden">
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
                   <div className={`w-full lg:w-1/2 flex flex-col justify-center px-6 py-16 lg:py-0 ${isEven ? 'lg:pr-16 xl:pr-32 lg:pl-16' : 'lg:pl-16 xl:pl-32 lg:pr-16'}`}>
                      <span className="text-sm tracking-widest uppercase font-mono text-warm-500 mb-6 block">0{i + 1}</span>
                      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal-900 mb-8 leading-tight">
                        {service.title}
                      </h2>
                      <p className="text-xl text-warm-600 leading-relaxed font-light mb-12 max-w-xl">
                        {service.shortDescription}
                      </p>
                      
                      {service.slug?.current && (
                        <Link 
                          href={`/services/${service.slug.current}`}
                          className="inline-flex items-center gap-4 text-xs tracking-widest uppercase font-mono text-charcoal-900 border-b border-charcoal-900 pb-2 w-fit hover:text-warm-500 hover:border-warm-500 transition-colors group/link"
                        >
                          View Service Details
                          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                        </Link>
                      )}
                   </div>
                   
                </div>
              </AnimatedSection>
            );
          })}
        </section>

        <FAQSection />

      </main>
      <Footer />
    </>
  );
}
