import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ServiceProposalForm } from "@/components/forms/ServiceProposalForm";

export function ServiceContactSection() {
  return (
    <section className="relative py-24 md:py-32 w-full overflow-hidden bg-black text-white border-t border-brand-blue/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          <AnimatedSection className="w-full lg:w-1/2">
            <span className="text-brand-blue font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">
              READY TO START?
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-display text-white mb-6 leading-[0.95] drop-shadow-xl">
              Let's engineer <br /><span className="text-brand-blue italic">your vision.</span>
            </h2>
            <p className="text-warm-100/80 text-lg md:text-xl font-light mb-8 max-w-xl">
              Fill out the form to request a detailed proposal for your specific project. Our engineering team will review your requirements and get back to you within 24 hours.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={200} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <ServiceProposalForm />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
