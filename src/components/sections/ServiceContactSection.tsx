import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ServiceProposalForm } from "@/components/forms/ServiceProposalForm";

interface ServiceContactSectionProps {
  translations: {
    eyebrow: string;
    title_1: string;
    title_2: string;
    description: string;
  };
  formTranslations: {
    success_title: string;
    success_message: string;
    label_first_name: string;
    label_last_name: string;
    label_email: string;
    label_phone: string;
    label_project_info: string;
    label_address: string;
    label_city: string;
    label_state: string;
    label_zip: string;
    btn_submit: string;
  };
}

export function ServiceContactSection({ translations, formTranslations }: ServiceContactSectionProps) {
  return (
    <section className="relative py-24 md:py-32 w-full overflow-hidden bg-black text-white border-t border-brand-blue/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          <AnimatedSection className="w-full lg:w-1/2">
            <span className="text-brand-blue font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">
              {translations.eyebrow}
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-display text-white mb-6 leading-[0.95] drop-shadow-xl">
              {translations.title_1} <br /><span className="text-brand-blue italic">{translations.title_2}</span>
            </h2>
            <p className="text-warm-100/80 text-lg md:text-xl font-light mb-8 max-w-xl">
              {translations.description}
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={200} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <ServiceProposalForm translations={formTranslations} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
