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
  title: "About Us | DH Engineering & Consulting LLC",
  description:
    "Learn about DH Engineering & Consulting LLC — a specialized engineering firm providing structural design, MEP coordination, building recertifications, and inspections across Florida.",
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
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2000&auto=format"
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
                <span className="text-brand-blue font-mono text-xs tracking-[0.3em] uppercase mb-8 block flex items-center gap-4">
                  <div className="w-8 h-px bg-brand-blue" /> Our Firm
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-[8rem] font-display text-white leading-[0.9] mb-6 md:mb-8 drop-shadow-2xl">
                  Engineering <br />
                  <span className="text-brand-blue/70 italic font-light">built to last.</span>
                </h1>
                <p className="text-warm-100/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl">
                  DH Engineering &amp; Consulting LLC provides comprehensive structural and MEP engineering services — combining technical expertise with a practical understanding of construction and permitting across Florida.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* AT-A-GLANCE METRICS STRIP (The Authority Stats) */}
        <section className="bg-charcoal-800 border-y border-brand-blue/20 text-white relative z-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-blue/20 font-mono tracking-widest uppercase text-xs">
              <div className="py-6 md:py-10 md:px-10 flex flex-col gap-2 justify-center items-center text-center">
                 <span className="text-4xl lg:text-5xl font-display text-white mb-1 md:mb-2">100+</span>
                 <span className="text-brand-blue/60 text-[10px]">Completed Projects</span>
              </div>
              <div className="py-6 md:py-10 md:px-10 flex flex-col gap-2 justify-center items-center text-center">
                 <span className="text-4xl lg:text-5xl font-display text-white mb-1 md:mb-2">FBC</span>
                 <span className="text-brand-blue/60 text-[10px]">Florida Building Code Experts</span>
              </div>
              <div className="py-6 md:py-10 md:px-10 flex flex-col gap-2 justify-center items-center text-center">
                 <span className="text-4xl lg:text-5xl font-display text-white mb-1 md:mb-2">4</span>
                 <span className="text-brand-blue/60 text-[10px]">Core Engineering Disciplines</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Vision / Editorial */}
        <section className="container mx-auto py-16 md:py-32 px-6" aria-labelledby="vision-heading">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start">
              {/* Image side */}
              <div className="col-span-1 lg:col-span-5 relative h-[300px] md:h-[450px] lg:h-[600px] w-full group">
                <Image
                  src="https://images.unsplash.com/photo-1481253127861-534498168948?w=1200&auto=format"
                  alt="Architecture sketching"
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-transparent transition-colors duration-1000" />
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-blue/10 -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 border border-brand-blue/20 -z-10" />
              </div>
              
              {/* Text side */}
              <div className="col-span-1 lg:col-span-6 lg:col-start-7 flex flex-col justify-center py-8">
                <span className="text-brand-blue font-mono text-xs tracking-widest uppercase mb-6 block">Our Mission</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-900 mb-12 leading-tight">
                  Engineering that serves <span className="italic font-light text-brand-blue">your vision.</span>
                </h2>
                
                <div className="prose prose-stone prose-base md:prose-lg max-w-none text-charcoal-700 leading-relaxed font-light md:first-letter:text-7xl md:first-letter:font-display md:first-letter:text-charcoal-900 md:first-letter:float-left md:first-letter:mr-6 md:first-letter:-mt-2 md:first-letter:leading-none">
                  <p className="mb-8">
                    At DH Engineering & Consulting LLC, we provide comprehensive engineering services by combining structural expertise with a practical understanding of construction and permitting processes. We specialize in structural design for residential and commercial projects, along with MEP coordination — delivering efficient and fully integrated solutions under one firm.
                  </p>
                  <p className="mb-12">
                    With extensive experience under the Florida Building Code, we produce accurate, code-compliant designs with a strong focus on constructability and cost-efficiency. We also offer building recertifications, structural inspections, and as-built evaluations, supporting clients throughout every stage of their projects.
                  </p>
                </div>
                
                {/* Signature element */}
                <div className="flex items-center gap-6 mt-4">
                  <div className="w-16 h-px bg-brand-blue/40" />
                  <div className="flex flex-col">
                    <span className="font-display text-4xl text-charcoal-900">DH Engineering</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-brand-blue/60 font-mono mt-1">& Consulting LLC</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Culture / Studio Behind the Scenes */}
        <section className="bg-charcoal-900 text-white py-16 md:py-32 overflow-hidden border-t border-brand-blue/20">
           <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                 <div className="order-2 lg:order-1">
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue/80 mb-4 md:mb-6 block">How We Work</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-display leading-tight mb-6 md:mb-8">
                       Precision at every <br/><span className="text-brand-blue/60 italic font-light">phase.</span>
                    </h2>
                    <p className="text-warm-100/70 font-light text-lg lg:text-xl leading-relaxed max-w-lg mb-12">
                       We take pride in providing reliable, high-quality engineering services at competitive prices — meeting deadlines and supporting our clients with clear communication at every step of the process.
                    </p>
                    <ul className="space-y-6">
                       {['Code-compliant structural design', 'Integrated MEP coordination', 'Permitting & code compliance support', 'Construction-phase engineering support'].map((item, i) => (
                           <li key={i} className="flex items-center gap-4 text-warm-50 font-light">
                             <div className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> {item}
                           </li>
                       ))}
                    </ul>
                 </div>
                 <div className="order-1 lg:order-2 relative aspect-square lg:aspect-[4/5]">
                    <Image 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200" 
                      alt="Architecture Studio" 
                      fill 
                      className="object-cover opacity-80" 
                    />
                    <div className="absolute inset-0 bg-charcoal-900/20" />
                    {/* Floating secondary image */}
                    <div className="absolute -bottom-10 -left-10 w-2/3 aspect-[4/3] border-4 border-charcoal-900 shadow-2xl hidden md:block">
                       <Image 
                         src="/services/tech-blueprint.png" 
                         alt="Blueprint detailing"
                         fill
                         className="object-cover opacity-80"
                       />
                       <div className="absolute inset-0 bg-charcoal-900/20" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Our History / Interactive Timeline */}
        <section className="bg-cream-100 container-none py-24 md:py-40 border-t border-brand-blue/10" aria-labelledby="timeline-heading">
          <div className="container mx-auto px-6 max-w-5xl">
            <AnimatedSection className="text-center mb-20 md:mb-32">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue mb-6 block">Our Journey</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-900">
                Built on <span className="italic font-light text-brand-blue">experience.</span>
              </h2>
            </AnimatedSection>
            
            <div className="relative space-y-16 md:space-y-24 lg:space-y-32">
              {/* Central vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brand-blue/20 -translate-x-1/2" />
              
              {[
                { year: "Est.", title: "Founded in Florida", description: "DH Engineering & Consulting LLC was established with a clear mission: deliver accurate, code-compliant engineering services at competitive prices, with a focus on constructability." },
                { year: "Core", title: "Structural Design", description: "Developed a strong foundation in residential and commercial structural design under the Florida Building Code — from single-family homes to mid-rise buildings." },
                { year: "Exp.", title: "MEP Integration", description: "Expanded services to include MEP coordination, enabling a fully integrated engineering solution under one firm and eliminating costly interdisciplinary gaps." },
                { year: "Now", title: "Full-Service Engineering", description: "Today we provide structural inspections, building recertifications, as-built evaluations, and shop drawings — supporting clients through every phase of their project." }
              ].map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <AnimatedSection key={item.year} delay={idx * 100} className="relative flex flex-col md:flex-row items-center md:justify-between group">
                    {/* Node */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-blue border-4 border-cream-100 flex-shrink-0 -translate-x-1/2 group-hover:scale-150 transition-transform duration-500 z-10" />
                    
                    {/* Year background watermark — hidden on mobile, decorative on desktop only */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[250px] font-display text-brand-blue/20 z-0 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
                       {item.year}
                    </div>

                    <div className={`pl-16 md:pl-0 md:w-5/12 z-10 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:ml-auto md:pl-12'}`}>
                      <span className="text-brand-blue/50 font-mono tracking-widest text-sm mb-4 block transition-colors duration-500 group-hover:text-brand-blue">{item.year}</span>
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
          <section className="bg-charcoal-900 py-16 md:py-32 lg:py-48 px-6 border-t border-brand-blue/20" aria-labelledby="team-heading">
            <div className="container mx-auto max-w-7xl">
              <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-24">
                <div>
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue/80 mb-4 block">Our Team</span>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white">
                    The engineers <br/><span className="italic font-light text-brand-blue/60">behind your project.</span>
                  </h2>
                </div>
              </AnimatedSection>

              <AnimatedSection className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden group">
                <Image
                  src="/portfolio/team-group.png"
                  alt="Our engineering team"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[1500ms] ease-out opacity-80"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000" />
                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-lg">
                  <p className="font-mono text-sm tracking-widest text-brand-blue uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out delay-100">
                    Collaborative approach
                  </p>
                  <p className="text-warm-100/90 font-light text-base md:text-xl leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-200">
                    Our diverse team of structural engineers, architects, and detailers working together to bring your vision to reality.
                  </p>
                </div>
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
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue/80 mb-6 block">Start a conversation</span>
              <h2 className="text-display-lg md:text-7xl font-display text-white mb-12 leading-tight">
                Ready to start your <span className="text-brand-blue/70 italic font-light">project?</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/services" className="bg-white text-charcoal-900 px-10 py-5 uppercase tracking-[0.2em] text-xs font-mono hover:bg-warm-100 transition-colors w-full sm:w-auto text-center border border-white">
                  Our Services
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
