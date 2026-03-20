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
      {/* 
        New Structure: Split-Screen Hero + Dedicated Calendly Section
        Left: Visual Map/Photo + Glassmorphism Contact Info Card
        Right: Scrollable Contact Form 
      */}
      <main className="min-h-screen flex flex-col bg-cream-50">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-[100svh]">
          
          {/* Right Side (Form) - Ordered First on Mobile */}
          <div className="order-1 lg:order-2 px-6 py-32 lg:px-16 xl:px-24 flex flex-col justify-center overflow-y-auto">
            <AnimatedSection>
              <SectionHeading
                eyebrow="Contact"
                title="Start a conversation."
                subtitle="Every great architectural endeavor begins with an honest dialogue. Tell us about your vision, site, and aspirations."
                className="mb-16"
              />
              <ContactForm />
            </AnimatedSection>
          </div>

          {/* Left Side (Map + Info Overlay) - Ordered Second on Mobile */}
          <div className="relative order-2 lg:order-1 h-[60vh] lg:h-auto min-h-[600px] group border-t lg:border-t-0 lg:border-r border-warm-200">
            {/* Map Iframe */}
            <div className="absolute inset-0 z-0 bg-[#e5e3df]">
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent pointer-events-none z-10" />
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vertex Build Group office map"
                aria-label="Map showing Vertex Build Group office location in Miami"
                className="w-full h-full grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
            </div>
            
            {/* Contact Info Card */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-20">
              <AnimatedSection delay={200}>
                <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 shadow-2xl border border-white">
                  <h2 className="font-display text-2xl text-charcoal-900 mb-8 border-b border-warm-200 pb-6">Miami Headquarters</h2>
                  
                  <div className="space-y-6">
                    <address className="not-italic text-charcoal-700 text-sm md:text-base space-y-1">
                      <p className="flex items-start gap-4">
                        <MapPin size={20} className="text-warm-500 shrink-0 mt-0.5" />
                        <span>100 Brickell Ave, Suite 1200<br />Miami, FL 33131</span>
                      </p>
                    </address>
                    
                    <a
                      href="tel:+13050000000"
                      className="flex items-center gap-4 text-charcoal-700 text-sm md:text-base hover:text-warm-500 transition-colors group/link"
                    >
                      <Phone size={20} className="text-warm-500 shrink-0 group-hover/link:scale-110 transition-transform" />
                      +1 (305) 000-0000
                    </a>
                    
                    <a
                      href="mailto:hello@vertexbuildgroup.com"
                      className="flex items-center gap-4 text-charcoal-700 text-sm md:text-base hover:text-warm-500 transition-colors group/link"
                    >
                      <Mail size={20} className="text-warm-500 shrink-0 group-hover/link:scale-110 transition-transform" />
                      hello@vertexbuildgroup.com
                    </a>

                    <div className="flex items-start gap-4 text-charcoal-700 text-sm md:text-base pt-4 border-t border-warm-200 border-dashed">
                      <Clock size={20} className="text-warm-500 shrink-0 mt-0.5" />
                      <div>
                        <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
                        <p className="text-warm-500 mt-1">Weekends by exclusive appointment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
          
        </div>

        {/* Dedicated Calendly Section */}
        <div className="bg-charcoal-900 text-cream-100 py-24 lg:py-32 border-t border-charcoal-800">
          <div className="container mx-auto px-6 md:px-12">
            <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Text Context */}
              <div className="order-2 lg:order-1">
                 <span className="text-xs tracking-widest uppercase font-mono text-warm-500 mb-6 block">Book a slot</span>
                 <h2 className="text-display-md md:text-display-lg font-display text-white mb-6 leading-tight">
                   Prefer to speak <br className="hidden md:block"/> directly with us?
                 </h2>
                 <p className="text-warm-300 text-lg leading-relaxed max-w-lg mb-8 font-light">
                   Bypass the form completely. Schedule a 15-minute, no-obligation discovery call with one of our principal architects at a time that works flawlessly for your schedule.
                 </p>
                 <div className="flex items-center gap-4 text-sm font-mono tracking-widest text-warm-400">
                    <span className="w-12 h-px bg-warm-400" />
                    SELECT A TIME ON THE RIGHT
                 </div>
              </div>

              {/* Calendly Inline Widget Embed */}
              <div className="order-1 lg:order-2 h-[650px] w-full rounded-sm overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative group/cal">
                <div className="absolute inset-0 bg-charcoal-900/50 flex items-center justify-center opacity-0 group-hover/cal:opacity-100 transition-opacity pointer-events-none z-10 duration-500">
                   {/* Optional interaction overlay */}
                </div>
                <iframe 
                  src="https://calendly.com/sales/15min" 
                  width="100%" 
                  height="100%" 
                  title="Schedule a discovery call with Vertex Build Group"
                  className="w-full h-full grayscale-[50%] contrast-110 opacity-90 transition-all duration-700 group-hover/cal:grayscale-0 group-hover/cal:opacity-100"
                />
              </div>

            </AnimatedSection>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
