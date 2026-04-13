"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ServiceProposalForm() {
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
          <h3 className="text-3xl font-display text-white mb-2">Request Sent.</h3>
          <p className="text-white/70 text-lg font-light">Our engineering team will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="group">
              <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                First Name
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
                Last Name
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
                Email
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
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
              />
            </div>
          </div>

          <div className="pt-6">
            <h4 className="text-xs tracking-widest uppercase font-mono text-brand-blue mb-6">Project Information</h4>
            <div className="space-y-8">
              <div className="group">
                <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                  Address
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
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Miami"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
                  />
                </div>
                <div className="group">
                  <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="FL"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors text-lg"
                  />
                </div>
                <div className="group">
                  <label className="text-xs tracking-widest uppercase font-mono text-white/50 mb-2 block group-focus-within:text-brand-blue transition-colors">
                    Zip Code
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
              Submit Request
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
