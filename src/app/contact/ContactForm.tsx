"use client";

import { useActionState } from "react";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { submitContactForm, type ContactState } from "./actions";

const PROJECT_TYPES = [
  "Residential — New Build",
  "Residential — Renovation",
  "Commercial — New Build",
  "Commercial — Tenant Improvement",
  "Interior Design",
  "Architecture — Design Only",
  "Other",
];

const initialState: ContactState = { success: false, message: "" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.success) {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center">
          <CheckCircle size={20} className="text-charcoal-900" />
        </div>
        <h3 className="text-xl font-display text-charcoal-900">Message sent.</h3>
        <p className="text-warm-500 text-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-8">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="eyebrow block mb-2">
          Full Name *
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Smith"
          className="input-field"
          aria-describedby={state.errors?.name ? "name-error" : undefined}
        />
        {state.errors?.name && (
          <p id="name-error" className="text-xs text-red-600 mt-1" role="alert">
            {state.errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="eyebrow block mb-2">
          Email Address *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          className="input-field"
          aria-describedby={state.errors?.email ? "email-error" : undefined}
        />
        {state.errors?.email && (
          <p id="email-error" className="text-xs text-red-600 mt-1" role="alert">
            {state.errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className="eyebrow block mb-2">
          Phone (optional)
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (305) 000-0000"
          className="input-field"
        />
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="contact-project-type" className="eyebrow block mb-2">
          Project Type
        </label>
        <select
          id="contact-project-type"
          name="projectType"
          className="input-field bg-transparent"
        >
          <option value="">Select a category…</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="eyebrow block mb-2">
          Tell us about your project *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Briefly describe your project, timeline, and what you're looking for."
          className="input-field resize-none"
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message && (
          <p id="message-error" className="text-xs text-red-600 mt-1" role="alert">
            {state.errors.message}
          </p>
        )}
      </div>

      {/* Global error */}
      {!state.success && state.message && Object.keys(state.errors || {}).length > 0 && (
        <div className="flex items-center gap-2 text-red-600 text-xs" role="alert">
          <AlertCircle size={14} />
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        aria-busy={isPending}
      >
        {isPending ? "Sending…" : (
          <>Send message <ArrowRight size={14} /></>
        )}
      </button>
    </form>
  );
}
