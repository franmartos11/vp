import type { Metadata } from "next";
import Image from "next/image";
import { LinkedinIcon } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { sanityFetch, allTeamMembersQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { FALLBACK_TEAM } from "@/lib/fallbackData";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vertex Build Group's design philosophy, process, and the team behind our award-winning architecture and construction projects.",
};

type TeamMember = {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: { asset: { _ref: string }; alt?: string };
  linkedIn?: string;
};

const PROCESS_STEPS = [
  { number: "01", title: "Discovery", description: "We study your site, brief, and aspirations in depth before touching a pencil." },
  { number: "02", title: "Design", description: "Conceptual design to construction documents — with your input at every stage." },
  { number: "03", title: "Permitting", description: "We manage all municipal submissions, approvals, and compliance documentation." },
  { number: "04", title: "Build", description: "On-site execution with our vetted network of master craftspeople and specialists." },
];

export default async function AboutPage() {
  let team: TeamMember[] = [];
  try {
    team = await sanityFetch<TeamMember[]>({ query: allTeamMembersQuery, tags: ["teamMember"] });
  } catch { /* CMS not connected */ }

  if (team.length === 0) {
    team = FALLBACK_TEAM as any[];
  }

  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-36">
        {/* Vision */}
        <section className="container mx-auto pb-24 md:pb-32" aria-labelledby="vision-heading">
          <AnimatedSection>
            <div className="grid-swiss border-b border-warm-200 pb-16">
              <div className="col-span-12 md:col-span-5">
                <SectionHeading
                  eyebrow="About Us"
                  title="We believe in the permanence of great design."
                />
              </div>
              <div className="col-span-12 md:col-span-5 md:col-start-7 flex flex-col justify-end mt-8 md:mt-0">
                <p className="text-warm-500 leading-relaxed">
                  Vertex Build Group was founded on a simple conviction: that buildings should outlast their owners in beauty and utility.
                  We bring together architects, engineers, and builders under one roof to eliminate the friction that degrades most luxury projects.
                </p>
                <p className="text-warm-500 leading-relaxed mt-4">
                  Our work spans Florida, New York, and the Carolinas — residential estates, commercial landmarks, and surgical renovations that honor the original architecture.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Process */}
        <section className="bg-cream-50 py-24 md:py-32" aria-labelledby="process-heading">
          <div className="container mx-auto">
            <AnimatedSection className="mb-16">
              <SectionHeading
                eyebrow="How We Work"
                title="A rigorous process, refined over decades."
              />
            </AnimatedSection>
            <AnimatedSection stagger className="grid-swiss">
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className="col-span-12 md:col-span-3 border-t border-warm-200 pt-8">
                  <span className="eyebrow text-warm-300 block mb-4">{step.number}</span>
                  <h3 className="font-display text-xl text-charcoal-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-warm-500 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* Full-bleed image */}
        <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=2000&auto=format"
            alt="Vertex Build Group studio workspace"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/30" />
        </div>

        {/* Team */}
        {team.length > 0 && (
          <section className="container mx-auto py-24 md:py-32" aria-labelledby="team-heading">
            <AnimatedSection className="mb-16">
              <SectionHeading eyebrow="Our Team" title="The people behind the work." />
            </AnimatedSection>
            <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => {
                const photoUrl = member.photo?.asset?._ref
                  ? urlFor(member.photo).width(600).height(700).auto("format").url()
                  : (member as any).photoUrl;
                return (
                  <article key={member._id} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden bg-warm-200 mb-4">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={member.photo?.alt || member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-warm-200 flex items-center justify-center">
                          <span className="text-warm-400 text-xs uppercase tracking-widest">Photo</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-base text-charcoal-900">{member.name}</h3>
                        <p className="text-sm text-warm-500 mt-0.5">{member.role}</p>
                        {member.bio && (
                          <p className="text-xs text-warm-400 mt-2 leading-relaxed line-clamp-3">
                            {member.bio}
                          </p>
                        )}
                      </div>
                      {member.linkedIn && (
                        <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="text-warm-400 hover:text-charcoal-900 transition-colors shrink-0 mt-1">
                          <LinkedinIcon size={16} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </AnimatedSection>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
