"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslations } from "next-intl";



function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-warm-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-8 md:py-10 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-xl md:text-2xl text-charcoal-900 group-hover:text-brand-blue transition-colors duration-300 pr-8">
          {question}
        </span>
        <span className="shrink-0 text-brand-blue group-hover:text-brand-blue transition-colors duration-300">
          <div className={`relative w-8 h-8 rounded-full border border-brand-blue/30 flex items-center justify-center transition-all duration-500 ${open ? 'rotate-180 bg-brand-blue/5 border-brand-blue' : ''}`}>
             <Plus size={16} strokeWidth={1.5} className={`absolute transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
             <Minus size={16} strokeWidth={1.5} className={`absolute transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <p className="text-charcoal-600/80 font-light text-lg md:text-xl leading-relaxed pb-10 pr-12 max-w-3xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const t = useTranslations("FAQ");
  
  return (
    <section className="bg-cream-50 py-24 md:py-32" aria-label="Frequently asked questions">
      <div className="container mx-auto px-6">
        <AnimatedSection className="max-w-3xl mb-20">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-4xl">
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const question = t(`questions.${index}.q` as any);
              const answer = t(`questions.${index}.a` as any);
              return <FAQItem key={index} question={question} answer={answer} />;
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
