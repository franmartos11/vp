"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const FAQS = [
  {
    question: "How long does a typical project take from start to finish?",
    answer:
      "It depends on scope. A high-end renovation typically runs 3–6 months. New residential construction ranges from 10–18 months. Commercial projects vary widely. We provide a detailed schedule before breaking ground so you always know the timeline.",
  },
  {
    question: "Do you work outside of Florida?",
    answer:
      "Yes. We currently operate across Florida, New York, and the Carolinas. For larger commercial projects, we're able to mobilize nationally with our network of vetted trade partners.",
  },
  {
    question: "Do you provide architectural renderings before construction?",
    answer:
      "Absolutely. Every project includes concept sketches, 3D renderings, and construction documents before any work begins. We believe in full visual alignment before breaking ground.",
  },
  {
    question: "What's your approach to budgeting and cost control?",
    answer:
      "We use open-book budgeting: you see every line item. We provide a detailed estimate before construction starts and keep you informed of any variances. Our goal is zero budget surprises.",
  },
  {
    question: "Can you handle the permitting process?",
    answer:
      "Yes, permitting and municipal approvals are part of our full-service offering. We manage all submissions, follow-ups, and compliance documentation so you don't have to.",
  },
  {
    question: "What types of projects do you specialize in?",
    answer:
      "We work across custom residential estates, commercial developments, high-end renovations, and full interior design. Our strength is end-to-end delivery — from architectural concept through construction handover.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-warm-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-base md:text-lg text-charcoal-900 group-hover:text-brand-blue transition-colors duration-300 pr-6">
          {question}
        </span>
        <span className="shrink-0 text-warm-400 group-hover:text-brand-blue transition-colors duration-300">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <p className="text-warm-500 text-sm leading-relaxed pb-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="bg-cream-50 py-24 md:py-32" aria-label="Frequently asked questions">
      <div className="container mx-auto">
        <AnimatedSection className="mb-16">
          <div className="grid-swiss">
            <div className="col-span-12 md:col-span-6">
              <SectionHeading
                eyebrow="FAQ"
                title="Common questions, clear answers."
                subtitle="Everything you need to know before starting a conversation with us."
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-3xl">
            {FAQS.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
