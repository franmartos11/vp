import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vertex Build Group. Tell us about your project — residential, commercial, or interior design. We respond within 24 hours.",
};

export default function ContactPage() {
  const mapsEmbedUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ||
    "https://maps.google.com/maps?q=100+Brickell+Ave+Miami+FL&output=embed";

  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-36">
        {/* Header */}
        <section className="container mx-auto pb-16 border-b border-warm-200 mb-16">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Contact"
              title="Let's start a conversation."
              subtitle="Tell us about your vision. Every great project begins with a conversation."
            />
          </AnimatedSection>
        </section>

        {/* Content */}
        <section className="container mx-auto pb-24 md:pb-32">
          <div className="grid-swiss gap-y-16">
            {/* Contact info */}
            <AnimatedSection className="col-span-12 md:col-span-4">
              <div className="space-y-10">
                <div>
                  <p className="eyebrow text-warm-400 mb-4">Visit Us</p>
                  <address className="not-italic text-warm-500 text-sm space-y-1 leading-relaxed">
                    <p className="flex items-start gap-2">
                      <MapPin size={14} className="mt-0.5 shrink-0 text-warm-400" />
                      <span>100 Brickell Ave, Suite 1200<br />Miami, FL 33131</span>
                    </p>
                  </address>
                </div>

                <div>
                  <p className="eyebrow text-warm-400 mb-4">Reach Us</p>
                  <div className="space-y-3">
                    <a
                      href="tel:+13050000000"
                      className="flex items-center gap-2 text-sm text-warm-500 hover:text-charcoal-900 transition-colors"
                    >
                      <Phone size={14} className="text-warm-400 shrink-0" />
                      +1 (305) 000-0000
                    </a>
                    <a
                      href="mailto:hello@vertexbuildgroup.com"
                      className="flex items-center gap-2 text-sm text-warm-500 hover:text-charcoal-900 transition-colors"
                    >
                      <Mail size={14} className="text-warm-400 shrink-0" />
                      hello@vertexbuildgroup.com
                    </a>
                  </div>
                </div>

                <div>
                  <p className="eyebrow text-warm-400 mb-4">Office Hours</p>
                  <div className="flex items-start gap-2 text-sm text-warm-500">
                    <Clock size={14} className="mt-0.5 shrink-0 text-warm-400" />
                    <div>
                      <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
                      <p>Weekends by appointment</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection className="col-span-12 md:col-span-7 md:col-start-6" delay={100}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </section>

        {/* Map */}
        <div className="h-80 md:h-96 w-full overflow-hidden bg-warm-200">
          <iframe
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vertex Build Group office location"
            aria-label="Map showing Vertex Build Group office location in Miami, FL"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
