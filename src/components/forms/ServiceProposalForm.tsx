"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface ServiceProposalFormProps {
  translations?: {
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

export function ServiceProposalForm({ translations }: ServiceProposalFormProps) {
  // Fallback if translations are not provided (e.g. while refactoring other pages)
  const defaultT = {
    success_title: "Request Sent.",
    success_message: "Our engineering team will get back to you shortly.",
    label_first_name: "First Name",
    label_last_name: "Last Name",
    label_email: "Email",
    label_phone: "Phone Number",
    label_project_info: "Project Information",
    label_address: "Address",
    label_city: "City",
    label_state: "State",
    label_zip: "Zip Code",
    btn_submit: "Submit Request"
  };

  const t = translations || defaultT;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real scenario, this would send data. For now we just show visual success.
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-xl mx-auto"
    >
      {submitted ? (
        <div className="py-20 text-center text-white flex flex-col items-start justify-center h-full gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-blue/20 flex flex-col items-center justify-center mb-2">
            <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-display text-white mb-2">{t.success_title}</h3>
          <p className="text-white/70 text-lg font-light">{t.success_message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="group">
              <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                {t.label_first_name}
              </label>
              <input
                type="text"
                required
                placeholder="John"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
              />
            </div>
            <div className="group">
              <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                {t.label_last_name}
              </label>
              <input
                type="text"
                required
                placeholder="Doe"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="group">
              <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                {t.label_email}
              </label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
              />
            </div>
            <div className="group">
              <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                {t.label_phone}
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
              />
            </div>
          </div>

          <div className="pt-6">
            <h4 className="text-xs tracking-widest uppercase font-mono text-brand-blue mb-6">{t.label_project_info}</h4>
            <div className="space-y-8">
              <div className="group">
                <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                  {t.label_address}
                </label>
                <input
                  type="text"
                  placeholder="123 Builder Ave"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="group">
                  <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                    {t.label_city}
                  </label>
                  <input
                    type="text"
                    placeholder="Miami"
                    className="text-lg w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors"
                  />
                </div>
                <div className="group">
                  <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                    {t.label_state}
                  </label>
                  <input
                    type="text"
                    placeholder="FL"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
                  />
                </div>
                <div className="group">
                  <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                    {t.label_zip}
                  </label>
                  <input
                    type="text"
                    placeholder="33101"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="group relative w-full sm:w-auto overflow-hidden bg-brand-blue text-white px-12 py-5 font-mono uppercase tracking-widest text-sm transition-all hover:bg-brand-blue-dark flex items-center justify-center gap-4"
            >
              {t.btn_submit}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
