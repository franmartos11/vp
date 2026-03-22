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

  // Fetch some projects for proof of work
  const featuredProjects = await db.project.findMany({ take: 2, orderBy: { order: 'asc' } }) as any[];

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
                <ArrowLeft size={14} className="group-hover/back:-translate-x-1 transition-transform" />
                Return to Services
              </Link>
              <h1 className="text-display-lg md:text-[7rem] font-display text-white mb-8 leading-[0.9] drop-shadow-xl max-w-6xl">
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
                 <span className="text-warm-500/70 text-[10px]">Timeline Benchmark</span>
                 <span className="text-warm-100 text-sm">6 - 18 Months</span>
              </div>
              <div className="py-8 md:px-8 flex flex-col gap-2 justify-center">
                 <span className="text-warm-500/70 text-[10px]">Investment Level</span>
                 <span className="text-warm-100 text-sm">Varies by Scope & Finishes</span>
              </div>
              <div className="py-8 md:px-8 flex flex-col gap-2 justify-center">
                 <span className="text-warm-500/70 text-[10px]">Ideal For</span>
                 <span className="text-warm-100 text-sm">Custom Builds & Deep Renovations</span>
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
                <div className="prose prose-stone prose-lg md:prose-xl max-w-none text-charcoal-700 leading-relaxed font-light whitespace-pre-line first-letter:text-7xl first-letter:font-display first-letter:text-charcoal-900 first-letter:float-left first-letter:mr-6 first-letter:-mt-2 first-letter:leading-none">
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

            {/* Right: Key Deliverables Sidebar (Luxury Style) */}
            <div className="lg:col-span-5 xl:col-span-4">
               <div className="sticky top-32 bg-white p-10 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-warm-100">
                 <AnimatedSection delay={100}>
                   <h3 className="font-display text-3xl text-charcoal-900 mb-8 pb-6 border-b border-warm-200">
                     Core <span className="italic font-light text-warm-600">Deliverables</span>
                   </h3>
                   {rawDeliverables && rawDeliverables.length > 0 ? (
                      <ul className="space-y-8">
                        {rawDeliverables.map((item: string, index: number) => (
                           <li key={index} className="flex items-start gap-6 group">
                             <div className="font-mono text-warm-400 text-sm tracking-widest pt-1 group-hover:text-warm-600 transition-colors">
                               0{index + 1}
                             </div>
                             <span className="text-lg text-charcoal-800 font-light leading-snug group-hover:text-charcoal-900 transition-colors">{item}</span>
                           </li>
                        ))}
                      </ul>
                   ) : (
                      <p className="text-warm-500 font-light italic">Detailed parameters curated per project scope.</p>
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
               <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-6 block">Execution Strategy</span>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight">
                 How we deliver <br/><span className="text-warm-200 italic font-light">this service.</span>
               </h2>
             </AnimatedSection>

             <div className="space-y-0 text-center md:text-left relative before:absolute before:inset-0 before:ml-auto before:mr-auto md:before:ml-[28px] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-warm-800 before:to-transparent">
                {[
                  { phase: "Phase 1", title: "Assessment & Foundation", desc: "We begin with a granular analysis of your site, objectives, and parameters, laying the unshakeable groundwork for success." },
                  { phase: "Phase 2", title: "Design & Engineering", desc: "Rigorous planning and 3D modeling eliminate guesswork. We finalize all permits, structural engineering, and design intent." },
                  { phase: "Phase 3", title: "Precision Execution", desc: "Our in-house master builders and dedicated project managers execute the blueprints with militaristic precision." },
                ].map((step, i) => (
                  <AnimatedSection key={i} delay={i * 100} className="relative flex flex-col md:flex-row items-center justify-between md:justify-normal md:gap-16 pb-16 last:pb-0 group">
                    <div className="hidden md:flex flex-shrink-0 w-14 h-14 rounded-full bg-charcoal-900 border-2 border-warm-800 group-hover:border-warm-500 transition-colors duration-500 items-center justify-center z-10 text-warm-500 group-hover:text-warm-400 font-mono">
                      0{i+1}
                    </div>
                    <div className="md:w-full bg-charcoal-800/30 border border-warm-800/30 p-8 md:p-12 hover:bg-charcoal-800/80 transition-colors duration-500 w-full relative z-10 backdrop-blur-sm">
                      <span className="font-mono text-[10px] tracking-widest text-warm-500 uppercase mb-4 block">{step.phase}</span>
                      <h4 className="text-2xl md:text-3xl font-display mb-4 text-warm-50">{step.title}</h4>
                      <p className="text-warm-100/60 font-light leading-relaxed text-lg">{step.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
             </div>
          </div>
        </section>

        {/* RELATED PROJECTS (Proof of Work) */}
        {featuredProjects && featuredProjects.length > 0 && (
          <section className="bg-cream-100 py-32 border-t border-warm-200">
            <div className="container mx-auto px-6 max-w-7xl">
              <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                <div>
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-4 block">Proof of Work</span>
                  <h2 className="text-4xl md:text-5xl font-display text-charcoal-900">
                    Results in <span className="italic font-light">focus.</span>
                  </h2>
                </div>
                <Link href="/portfolio" className="inline-flex items-center gap-3 text-charcoal-900 border-b border-charcoal-900 pb-1 font-mono text-xs uppercase tracking-widest hover:text-warm-500 hover:border-warm-500 transition-all">
                  View full portfolio <ArrowUpRight size={14} />
                </Link>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                {featuredProjects.map((project, i) => (
                  <AnimatedSection key={project.id} delay={i * 100} className="group cursor-pointer">
                    <Link href={`/portfolio/${project.slug}`}>
                      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden mb-8">
                        <Image 
                          src={project.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"} 
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out"
                        />
                        <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-transparent transition-colors duration-700" />
                      </div>
                      <h3 className="text-2xl font-display text-charcoal-900 mb-2 group-hover:text-warm-600 transition-colors">{project.title}</h3>
                      <p className="text-warm-500 font-mono text-xs uppercase tracking-widest">{project.projectType || "Luxury Build"}</p>
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
                   <h2 className="text-4xl font-display text-charcoal-900 mb-4">Service Gallery</h2>
                   <p className="text-warm-500 font-mono text-xs uppercase tracking-[0.3em]">Detail & Execution</p>
                </AnimatedSection>
                <GalleryLightbox images={galleryImages} />
             </div>
          </section>
        )}

        {/* SERVICE FAQ (Static Editorial Style) */}
        <section className="bg-cream-50 py-32 px-6 border-t border-warm-200">
           <div className="container mx-auto max-w-4xl">
              <AnimatedSection className="mb-20 text-center">
                 <h2 className="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">Common Questions</h2>
                 <div className="w-16 h-px bg-warm-400 mx-auto" />
              </AnimatedSection>

              <div className="space-y-16">
                {[
                  { q: "Is this service customized to my specific property?", a: "Absolutely. Every engagement begins with a bespoke assessment of your site conditions, local zoning laws, and personal aesthetic requirements. We never use out-of-the-box solutions." },
                  { q: "Do you handle all necessary permitting internally?", a: "Yes. To maintain full control over the project timeline, our dedicated in-house compliance team manages all municipal submissions, variances, and architectural review boards." },
                  { q: "Will I have a dedicated point of contact?", a: "To ensure absolute clarity, you are assigned a principal-level Project Director along with a dedicated Site Manager who provide weekly debriefs and are always accessible." }
                ].map((faq, i) => (
                  <AnimatedSection key={i} delay={i * 100}>
                    <h4 className="text-2xl font-display text-charcoal-900 mb-4">{faq.q}</h4>
                    <p className="text-lg text-charcoal-600 font-light leading-relaxed">{faq.a}</p>
                  </AnimatedSection>
                ))}
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
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-6 block">Take the next step</span>
              <h2 className="text-display-md md:text-6xl lg:text-7xl font-display text-white mb-8 leading-tight">
                 Ready to begin your <span className="italic font-light text-warm-200">project?</span>
              </h2>
              <p className="text-warm-100/70 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                 Schedule a discovery phase with our {service.title.toLowerCase()} specialists.
              </p>
              <Link 
                href="/contact"
                className="inline-flex py-6 px-12 bg-warm-500 text-charcoal-900 font-mono text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors duration-500 items-center justify-center min-w-[280px]"
              >
                 Inquire Now
              </Link>
           </AnimatedSection>
        </section>

      </main>
      <Footer />
    </>
  );
}
