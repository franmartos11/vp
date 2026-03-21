"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  {
    num: "01",
    title: "Discovery & Vision",
    desc: "An immersive exploration of your lifestyle, site potential, and aesthetic ambitions.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format"
  },
  {
    num: "02",
    title: "Architectural Response",
    desc: "Translating concepts into exacting schematic designs, materializing intention through 3D visualization.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&auto=format"
  },
  {
    num: "03",
    title: "Precision Execution",
    desc: "Our master builders and site managers bring blueprints into physical reality with Swiss engineering.",
    image: "https://images.unsplash.com/photo-1541888081198-bc4a7e9da1ca?w=1000&auto=format"
  },
  {
    num: "04",
    title: "Handover",
    desc: "A meticulous walkthrough and delivery of your finished space, ready for generations of use.",
    image: "https://images.unsplash.com/photo-1600607687920-4e4d3e45c1b1?w=1000&auto=format"
  }
];

export function ProcessTimeline() {
  return (
    <section className="py-24 md:py-32 bg-cream-100 border-t border-warm-200">
      <div className="container mx-auto px-6 md:px-12">
        <AnimatedSection className="max-w-3xl mx-auto mb-16 text-center">
          <SectionHeading
             eyebrow="The Method"
             title="Engineered precision, step by step."
             align="center"
          />
        </AnimatedSection>

        <div className="max-w-6xl mx-auto relative">
          <div className="space-y-16 lg:space-y-24">
            {STEPS.map((step, index) => (
              <AnimatedSection 
                 key={index} 
                 className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Visual Node / Image */}
                <div className="w-full md:w-1/2 relative h-[300px] md:h-[450px] overflow-hidden group border border-warm-200 shadow-xl">
                   <Image 
                     src={step.image}
                     alt={step.title}
                     fill
                     unoptimized
                     sizes="(max-width: 768px) 100vw, 50vw"
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-charcoal-900/10 mix-blend-multiply" />
                   {/* Number overlay */}
                   <div className={`absolute bottom-0 bg-white/90 backdrop-blur-sm px-6 py-4 ${index % 2 === 0 ? 'right-0' : 'left-0'}`}>
                      <span className="text-4xl md:text-5xl font-display text-charcoal-900 leading-none">{step.num}</span>
                   </div>
                </div>
                
                {/* Content */}
                <div className="w-full md:w-1/2 relative bg-transparent p-6 md:p-8">
                   <span className="text-xs tracking-widest uppercase text-warm-400 font-mono mb-4 block">Stage {step.num}</span>
                   <h3 className="text-2xl md:text-4xl font-display text-charcoal-900 mb-6">{step.title}</h3>
                   <p className="text-charcoal-700 font-light leading-relaxed max-w-md text-lg">{step.desc}</p>
                   <div className="mt-8 w-12 h-px bg-warm-300" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
