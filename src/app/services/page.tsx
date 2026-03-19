import type { Metadata } from "next";
import { Building2, Home, Layers, PenTool, Wrench, Ruler } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { sanityFetch, allServicesQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vertex Build Group offers end-to-end luxury architecture, construction management, renovation, and interior design services across the United States.",
};

type Service = {
  _id: string;
  title: string;
  icon?: string;
  shortDescription?: string;
  fullDescription?: unknown[];
  order?: number;
};

const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  Home,
  Layers,
  PenTool,
  Wrench,
  Ruler,
};

const FALLBACK_SERVICES: Service[] = [
  { _id: "1", title: "Custom Architecture", icon: "PenTool", shortDescription: "Complete architectural design from concept through construction documents, tailored to your vision and site." },
  { _id: "2", title: "Residential Construction", icon: "Home", shortDescription: "Full-service luxury home construction — new builds, additions, and structural modifications." },
  { _id: "3", title: "Commercial Projects", icon: "Building2", shortDescription: "Commercial build-outs, tenant improvements, and ground-up commercial developments." },
  { _id: "4", title: "High-End Renovation", icon: "Wrench", shortDescription: "Surgical renovations that preserve architecture while elevating function, finish, and livability." },
  { _id: "5", title: "Interior Design", icon: "Layers", shortDescription: "Space planning, finish specification, furniture procurement, and art curation for the full interior experience." },
  { _id: "6", title: "Project Management", icon: "Ruler", shortDescription: "Owner's representative services — budget control, schedule management, and quality assurance from groundbreak to handover." },
];

export default async function ServicesPage() {
  let services: Service[] = [];
  try {
    services = await sanityFetch<Service[]>({ query: allServicesQuery, tags: ["service"] });
  } catch { /* CMS not connected */ }

  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-36">
        {/* Header */}
        <section className="container mx-auto pb-16 border-b border-warm-200 mb-16">
          <AnimatedSection>
            <div className="grid-swiss">
              <div className="col-span-12 md:col-span-7">
                <SectionHeading
                  eyebrow="What We Do"
                  title="Comprehensive services, singular focus."
                  subtitle="We offer the full spectrum of architecture, construction, and design — coordinated under one team."
                />
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Services list */}
        <section className="container mx-auto pb-24 md:pb-32">
          <div className="space-y-0">
            {displayServices.map((service, i) => {
              const IconComponent = service.icon ? ICON_MAP[service.icon] || Layers : Layers;
              return (
                <AnimatedSection key={service._id} delay={i * 50}>
                  <div className="py-10 border-b border-warm-200 grid-swiss group">
                    <div className="col-span-1 flex items-start pt-1">
                      <IconComponent
                        size={18}
                        className="text-warm-400 group-hover:text-charcoal-900 transition-colors duration-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="col-span-11 md:col-span-3">
                      <span className="text-2xs text-warm-400 tracking-widest uppercase block mb-2">
                        0{i + 1}
                      </span>
                      <h2 className="font-display text-xl text-charcoal-900">{service.title}</h2>
                    </div>
                    <div className="col-span-12 md:col-span-7 md:col-start-5 mt-4 md:mt-0">
                      {service.fullDescription ? (
                        <div className="text-warm-500 text-sm leading-relaxed prose-sm">
                          <PortableText value={service.fullDescription as Parameters<typeof PortableText>[0]['value']} />
                        </div>
                      ) : (
                        <p className="text-warm-500 text-sm leading-relaxed">{service.shortDescription}</p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
