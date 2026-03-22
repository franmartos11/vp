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
    <div className="border-b border-warm-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-8 md:py-10 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-xl md:text-2xl text-charcoal-900 group-hover:text-warm-600 transition-colors duration-300 pr-8">
          {question}
        </span>
        <span className="shrink-0 text-warm-400 group-hover:text-warm-600 transition-colors duration-300">
          <div className={`relative w-8 h-8 rounded-full border border-warm-300 flex items-center justify-center transition-all duration-500 ${open ? 'rotate-180 bg-warm-100 border-warm-400' : ''}`}>
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
  return (
    <section className="bg-cream-50 py-24 md:py-32" aria-label="Frequently asked questions">
      <div className="container mx-auto px-6">
        <AnimatedSection className="mb-20">
          <div className="grid-swiss">
            <div className="col-span-12 md:col-span-8">
              <span className="text-warm-500 font-mono text-xs tracking-widest uppercase mb-6 block">FAQ</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-900 mb-6">
                Common questions,<br/><span className="italic font-light text-warm-600">clear answers.</span>
              </h2>
              <p className="text-xl font-light text-charcoal-600 max-w-2xl">
                Everything you need to know before starting a conversation with us.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-4xl">
            {FAQS.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
