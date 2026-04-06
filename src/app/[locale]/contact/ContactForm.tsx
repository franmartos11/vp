"use client";

import { useActionState, useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { submitContactForm, type ContactState } from "./actions";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

// these will be moved into the component to access 't'

const initialState: ContactState = { success: false, message: "" };

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const PROJECT_TYPES = [
    t("types.res_new"),
    t("types.res_ren"),
    t("types.com_new"),
    t("types.interior"),
    t("types.other"),
  ];

  const BUDGET_RANGES = [
    { label: t("budgets.under250"), value: "under-250k" },
    { label: t("budgets.250to500"), value: "250k-500k" },
    { label: t("budgets.500to1m"), value: "500k-1m" },
    { label: t("budgets.1to3m"), value: "1m-3m" },
    { label: t("budgets.3mplus"), value: "3m-plus" },
    { label: t("budgets.notsure"), value: "not-sure" },
  ];

  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state.success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-warm-50 border border-warm-200"
          >
            <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-6">
              <CheckCircle size={32} className="text-brand-blue" />
            </div>
            <h3 className="text-3xl font-display text-charcoal-900 mb-4">
              {t("success")}
            </h3>
            <p className="text-warm-500 text-lg leading-relaxed max-w-md">
              {state.message}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            action={formAction}
            noValidate
            className="space-y-10"
          >
            <input type="hidden" name="projectType" value={projectType} />
            <input type="hidden" name="budget" value={budget} />

            {/* Grid Layout for short fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="group">
                <label
                  htmlFor="contact-name"
                  className="text-xs tracking-widest uppercase font-mono text-warm-500 mb-2 block group-focus-within:text-brand-blue transition-colors"
                >
                  {t("name_label")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t("name_placeholder")}
                  className="w-full bg-transparent border-b border-warm-300 py-3 text-charcoal-900 placeholder:text-warm-300 focus:outline-none focus:border-brand-blue transition-colors text-lg"
                  aria-describedby={
                    state.errors?.name ? "name-error" : undefined
                  }
                />
                {state.errors?.name && (
                  <p
                    id="name-error"
                    className="text-xs text-red-600 mt-2"
                    role="alert"
                  >
                    {state.errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="group">
                <label
                  htmlFor="contact-email"
                  className="text-xs tracking-widest uppercase font-mono text-warm-500 mb-2 block group-focus-within:text-brand-blue transition-colors"
                >
                  {t("email_label")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t("email_placeholder")}
                  className="w-full bg-transparent border-b border-warm-300 py-3 text-charcoal-900 placeholder:text-warm-300 focus:outline-none focus:border-brand-blue transition-colors text-lg"
                  aria-describedby={
                    state.errors?.email ? "email-error" : undefined
                  }
                />
                {state.errors?.email && (
                  <p
                    id="email-error"
                    className="text-xs text-red-600 mt-2"
                    role="alert"
                  >
                    {state.errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="md:col-span-2 group">
                <label
                  htmlFor="contact-phone"
                  className="text-xs tracking-widest uppercase font-mono text-warm-500 mb-2 block group-focus-within:text-brand-blue transition-colors"
                >
                  {t("phone_label")}
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (305) 000-0000"
                  className="w-full bg-transparent border-b border-warm-300 py-3 text-charcoal-900 placeholder:text-warm-300 focus:outline-none focus:border-brand-blue transition-colors text-lg"
                />
              </div>
            </div>

            {/* Project Type Pills */}
            <div>
              <label className="text-xs tracking-widest uppercase font-mono text-warm-500 mb-4 block">
                {t("type_label")}
              </label>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`px-3 py-2.5 border text-xs sm:text-sm transition-all duration-300 text-left sm:text-center ${
                      projectType === type
                        ? "bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/20"
                        : "bg-transparent border-warm-300 text-warm-500 hover:border-brand-blue hover:text-brand-blue hover:shadow-md"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Pills */}
            <div>
              <label className="text-xs tracking-widest uppercase font-mono text-warm-500 mb-4 block">
                {t("budget_label")}
              </label>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                {BUDGET_RANGES.map((range) => (
                  <button
                    key={range.value}
                    type="button"
                    onClick={() => setBudget(range.value)}
                    className={`px-3 py-2.5 border text-xs sm:text-sm font-mono tracking-wide transition-all duration-300 text-left sm:text-center ${
                      budget === range.value
                        ? "bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/20"
                        : "bg-transparent border-warm-300 text-warm-500 hover:border-brand-blue hover:text-brand-blue hover:shadow-md"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="group">
              <label
                htmlFor="contact-message"
                className="text-xs tracking-widest uppercase font-mono text-warm-500 mb-4 block group-focus-within:text-brand-blue transition-colors"
              >
                {t("message_label")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder={t("message_placeholder")}
                className="w-full bg-transparent border-b border-warm-300 py-3 text-charcoal-900 placeholder:text-warm-300 focus:outline-none focus:border-brand-blue transition-colors text-lg resize-none"
                aria-describedby={
                  state.errors?.message ? "message-error" : undefined
                }
              />
              {state.errors?.message && (
                <p
                  id="message-error"
                  className="text-xs text-red-600 mt-2"
                  role="alert"
                >
                  {state.errors.message}
                </p>
              )}
            </div>

            {/* Global error */}
            {!state.success &&
              state.message &&
              Object.keys(state.errors || {}).length > 0 && (
                <div
                  className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-4 border border-red-100"
                  role="alert"
                >
                  <AlertCircle size={16} />
                  <span>{state.message}</span>
                </div>
              )}

            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full md:w-auto overflow-hidden bg-brand-blue text-white px-10 py-5 font-mono uppercase tracking-widest text-sm disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:bg-brand-blue-dark"
              aria-busy={isPending}
            >
              <span
                className={`inline-flex items-center gap-3 transition-transform duration-300 ${isPending ? "translate-y-[-150%] opacity-0" : "translate-y-0 opacity-100"}`}
              >
                {t("btn_send")}{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>

              <span
                className={`absolute inset-0 flex items-center justify-center gap-3 transition-transform duration-300 ${isPending ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0"}`}
              >
                <Loader2 size={16} className="animate-spin" />{" "}
                {t("btn_sending")}
              </span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
