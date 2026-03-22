import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { StickyPillars } from "@/components/sections/StickyPillars";
import { TrustedPartners } from "@/components/sections/TrustedPartners";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FALLBACK_TEAM } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Vertex Build Group",
  description:
    "Learn about Vertex Build Group's design philosophy, process, and the team behind our award-winning architecture and construction projects.",
};

type TeamMember = {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: { asset: { _ref: string }; alt?: string };
  linkedIn?: string;
};

export default async function AboutPage() {
  const team = FALLBACK_TEAM;

  return (
    <>
      <Nav />
      <main className="bg-cream-50 pt-16">
        
        {/* Dark Immersive Hero */}
        <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-charcoal-900 group">
          {/* Background Texture */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2000&auto=format"
              alt="Architecture blueprint and design"
              fill
              className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-[20s] ease-out mix-blend-luminosity grayscale"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
          
          {/* Content Wrapper */}
          <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 container mx-auto px-6 z-10 transition-all">
            <AnimatedSection>
              <div className="max-w-6xl">
                <span className="text-warm-400 font-mono text-xs tracking-[0.3em] uppercase mb-8 block flex items-center gap-4">
                  <div className="w-8 h-px bg-warm-400" /> Our Firm
                </span>
                <h1 className="text-display-lg md:text-[8rem] font-display text-white leading-[0.9] mb-8 drop-shadow-2xl">
                  Permanence in <br />
                  <span className="text-warm-200 italic font-light">design.</span>
                </h1>
                <p className="text-warm-100/80 text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
                  Vertex Build Group was founded on a simple conviction: that buildings should outlast their owners in beauty and utility. Our team eliminates the friction that degrades most luxury projects.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* AT-A-GLANCE METRICS STRIP (The Authority Stats) */}
        <section className="bg-charcoal-800 border-y border-warm-800/30 text-white relative z-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-warm-800/30 font-mono tracking-widest uppercase text-xs">
              <div className="py-10 md:px-10 flex flex-col gap-2 justify-center items-center text-center">
                 <span className="text-4xl lg:text-5xl font-display text-white mb-2">20+</span>
                 <span className="text-warm-500/70 text-[10px]">Years of Excellence</span>
              </div>
              <div className="py-10 md:px-10 flex flex-col gap-2 justify-center items-center text-center">
                 <span className="text-4xl lg:text-5xl font-display text-white mb-2">$500M+</span>
                 <span className="text-warm-500/70 text-[10px]">Managed Portfolio</span>
              </div>
              <div className="py-10 md:px-10 flex flex-col gap-2 justify-center items-center text-center">
                 <span className="text-4xl lg:text-5xl font-display text-white mb-2">50+</span>
                 <span className="text-warm-500/70 text-[10px]">Industry Awards</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Vision / Editorial */}
        <section className="container mx-auto py-24 md:py-32 px-6" aria-labelledby="vision-heading">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              {/* Image side */}
              <div className="col-span-1 lg:col-span-5 relative h-[600px] w-full group">
                <Image
                  src="https://images.unsplash.com/photo-1481253127861-534498168948?w=1200&auto=format"
                  alt="Architecture sketching"
                  fill
                  className="object-cover grayscale mix-blend-multiply opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-warm-900/10 group-hover:bg-transparent transition-colors duration-1000" />
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-warm-200 -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 border border-warm-300 -z-10" />
              </div>
              
              {/* Text side */}
              <div className="col-span-1 lg:col-span-6 lg:col-start-7 flex flex-col justify-center py-8">
                <span className="text-warm-500 font-mono text-xs tracking-widest uppercase mb-6 block">The Vision</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-900 mb-12 leading-tight">
                  Architecture that speaks to <span className="italic font-light text-warm-600">generations.</span>
                </h2>
                
                <div className="prose prose-stone prose-lg max-w-none text-charcoal-700 leading-relaxed font-light first-letter:text-7xl first-letter:font-display first-letter:text-charcoal-900 first-letter:float-left first-letter:mr-6 first-letter:-mt-2 first-letter:leading-none">
                  <p className="mb-8">
                    Vertex Build Group was founded on a simple conviction: spaces should outlast their creators. We bring together architects, engineers, and builders under one roof to eliminate the friction that degrades most luxury projects.
                  </p>
                  <p className="mb-12">
                    From Florida to New York, our residential estates and commercial landmarks are crafted to stand the test of time, honoring natural materials and rigorous engineering. By unifying the phases of conception and execution, we protect the purity of the design while ensuring its structural and financial viability.
                  </p>
                </div>
                
                {/* Signature element */}
                <div className="flex items-center gap-6 mt-4">
                  <div className="w-16 h-px bg-warm-300" />
                  <div className="flex flex-col">
                    <span className="font-display text-4xl text-charcoal-900">Jonah Vertex</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-warm-500 font-mono mt-1">Founder & Principal</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Culture / Studio Behind the Scenes */}
        <section className="bg-charcoal-900 text-white py-32 overflow-hidden border-t border-warm-800">
           <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="order-2 lg:order-1">
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-6 block">Studio Culture</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-8">
                       An environment of <br/><span className="text-warm-200 italic font-light">relentless refinement.</span>
                    </h2>
                    <p className="text-warm-100/70 font-light text-lg lg:text-xl leading-relaxed max-w-lg mb-12">
                       Great architecture requires a culture that champions critique, collaboration, and an obsession with the details. Our headquarters is designed to blur the lines between drafting tables and material libraries.
                    </p>
                    <ul className="space-y-6">
                       {['In-house material lab', 'Collaborative open-plan studios', 'Continuous education programs'].map((item, i) => (
                           <li key={i} className="flex items-center gap-4 text-warm-50 font-light">
                             <div className="w-1.5 h-1.5 bg-warm-500 rounded-full" /> {item}
                           </li>
                       ))}
                    </ul>
                 </div>
                 <div className="order-1 lg:order-2 relative aspect-square lg:aspect-[4/5]">
                    <Image 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200" 
                      alt="Architecture Studio" 
                      fill 
                      className="object-cover opacity-80 mix-blend-luminosity grayscale" 
                    />
                    <div className="absolute inset-0 bg-charcoal-900/20" />
                    {/* Floating secondary image */}
                    <div className="absolute -bottom-10 -left-10 w-2/3 aspect-[4/3] border-4 border-charcoal-900 shadow-2xl hidden md:block">
                       <Image 
                         src="https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=2070" 
                         alt="Blueprint detailing"
                         fill
                         className="object-cover grayscale"
                       />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Our History / Interactive Timeline */}
        <section className="bg-cream-100 container-none py-24 md:py-40 border-t border-warm-200" aria-labelledby="timeline-heading">
          <div className="container mx-auto px-6 max-w-5xl">
            <AnimatedSection className="text-center mb-20 md:mb-32">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-6 block">Our History</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-900">
                A legacy of <span className="italic font-light text-warm-600">progress.</span>
              </h2>
            </AnimatedSection>
            
            <div className="relative space-y-24 md:space-y-32">
              {/* Central vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-warm-300 -translate-x-1/2" />
              
              {[
                { year: "2005", title: "Foundation", description: "Established in Miami as a boutique architectural firm focusing on high-end residential." },
                { year: "2012", title: "Integrated Construction", description: "Launched our construction division to offer end-to-end quality control and total transparency." },
                { year: "2018", title: "National Operations", description: "Opened our New York and Charleston offices to serve an expanding luxury client base." },
                { year: "2025", title: "A New Standard", description: "Pioneering sustainable luxury with passive-house certified estates across the US." }
              ].map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <AnimatedSection key={item.year} delay={idx * 100} className="relative flex flex-col md:flex-row items-center md:justify-between group">
                    {/* Node */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-warm-500 border-4 border-cream-100 flex-shrink-0 -translate-x-1/2 group-hover:scale-150 transition-transform duration-500 z-10" />
                    
                    {/* Year background watermark (Mobile hidden) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[250px] font-display text-warm-200/40 z-0 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
                       {item.year}
                    </div>

                    <div className={`pl-16 md:pl-0 md:w-5/12 z-10 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:ml-auto md:pl-12'}`}>
                      <span className="text-warm-500 font-mono tracking-widest text-sm mb-4 block transition-colors duration-500 group-hover:text-charcoal-900">{item.year}</span>
                      <h3 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-4">{item.title}</h3>
                      <p className="text-charcoal-600 leading-relaxed text-lg font-light">{item.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Core Values / Pillars */}
        <StickyPillars />

        {/* Team Section (Luxury Upgrade) */}
        {team.length > 0 && (
          <section className="bg-charcoal-900 py-32 md:py-48 px-6 border-t border-warm-800" aria-labelledby="team-heading">
            <div className="container mx-auto max-w-7xl">
              <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
                <div>
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-4 block">Our People</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white">
                    The architects <br/><span className="italic font-light text-warm-200">of reality.</span>
                  </h2>
                </div>
              </AnimatedSection>

              <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
                {team.map((member: any) => {
                  const photoUrl = member.photoUrl;
                  return (
                    <article key={member._id} className="group cursor-pointer">
                      <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-800 mb-6">
                        {photoUrl ? (
                          <Image
                            src={photoUrl}
                            alt={member.name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal opacity-80 hover:opacity-100"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-800 to-charcoal-700 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                            {/* Abstract pattern for missing photos */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)]" />
                            <span className="text-warm-500/50 text-xs font-mono uppercase tracking-widest">{member.name.split(' ')[0]}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-transparent transition-colors duration-700" />
                        
                        {/* Overlay Role on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal-900/90 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                           <p className="text-warm-200 font-light text-sm line-clamp-2">{member.bio || "Integral member of our execution and design strategy team."}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start justify-between border-b border-warm-800/50 pb-4 group-hover:border-warm-500 transition-colors duration-500">
                        <div>
                          <h3 className="font-display text-xl text-white group-hover:text-warm-100 transition-colors">{member.name}</h3>
                          <p className="text-xs font-mono uppercase tracking-[0.2em] text-warm-500 mt-2">{member.role}</p>
                        </div>
                        {member.linkedIn && (
                          <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="text-warm-500 hover:text-white transition-colors shrink-0 mt-1 cursor-none">
                            <LinkedinIcon size={18} strokeWidth={1.5} />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* Awards & Press */}
        <TrustedPartners />

        {/* The Process (Moved lower to serve as a bridge to contact) */}
        <ProcessTimeline />

        {/* Final CTA Overlay */}
        <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=2000&auto=format"
            alt="Vertex Build Group studio workspace"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-[20s] ease-out brightness-[0.3]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/60" />
          <div className="relative z-10 text-center px-6">
            <AnimatedSection>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-warm-500 mb-6 block">Initiate a dialogue</span>
              <h2 className="text-display-lg md:text-7xl font-display text-white mb-12 leading-tight">
                Ready to build your <span className="text-warm-300 italic font-light">legacy?</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/portfolio" className="bg-white text-charcoal-900 px-10 py-5 uppercase tracking-[0.2em] text-xs font-mono hover:bg-warm-100 transition-colors w-full sm:w-auto text-center border border-white">
                  View Portfolio
                </Link>
                <Link href="/contact" className="text-white px-10 py-5 uppercase tracking-[0.2em] text-xs font-mono border border-white hover:text-charcoal-900 hover:bg-white transition-colors w-full sm:w-auto text-center">
                  Contact Us
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
