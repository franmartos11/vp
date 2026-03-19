import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Maximize2, Clock, Award } from "lucide-react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { sanityFetch, projectBySlugQuery, allProjectSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourfirm.com";

const TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  renovation: "Renovation",
  interior: "Interior Design",
};

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  projectType: string;
  completionYear?: number;
  location?: string;
  coverImage: { asset: { _ref: string }; alt?: string };
  gallery?: Array<{ asset: { _ref: string }; alt?: string; caption?: string }>;
  description?: PortableTextBlock[];
  technicalSheet?: {
    squareFootage?: number;
    budget?: string;
    duration?: string;
    client?: string;
    architect?: string;
    awards?: string;
  };
  seoDescription?: string;
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<Array<{ slug: string }>>({
      query: allProjectSlugsQuery,
      tags: ["project"],
    });
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await sanityFetch<Project>({
      query: projectBySlugQuery,
      params: { slug },
      tags: [`project-${slug}`],
    });
    if (!project) return {};

    const imageUrl = project.coverImage
      ? urlFor(project.coverImage).width(1200).height(630).auto("format").url()
      : undefined;

    return {
      title: project.title,
      description: project.seoDescription || `${project.title} — A ${TYPE_LABELS[project.projectType]} project by Vertex Build Group.`,
      openGraph: {
        title: `${project.title} | Vertex Build Group`,
        description: project.seoDescription,
        images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  let project: Project | null = null;
  try {
    project = await sanityFetch<Project>({
      query: projectBySlugQuery,
      params: { slug },
      tags: [`project-${slug}`],
    });
  } catch {
    // CMS not connected
  }

  if (!project && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id") {
    notFound();
  }

  const coverUrl = project?.coverImage
    ? urlFor(project.coverImage).width(2000).height(1200).auto("format").url()
    : "https://images.unsplash.com/photo-1600607687920-4e4d3e45c1b1?w=2000&auto=format";

  const projectJsonLd = project
    ? {
        "@context": "https://schema.org",
        "@type": "Project",
        name: project.title,
        description: project.seoDescription,
        url: `${SITE_URL}/portfolio/${slug}`,
        image: coverUrl,
        location: project.location
          ? { "@type": "Place", name: project.location }
          : undefined,
        temporalCoverage: project.completionYear?.toString(),
        provider: {
          "@type": "Organization",
          name: "Vertex Build Group",
          url: SITE_URL,
        },
      }
    : null;

  return (
    <>
      {projectJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        />
      )}
      <Nav />
      <main className="pt-16">
        {/* Hero image */}
        <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt={project?.coverImage?.alt || project?.title || "Project"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto pb-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-warm-300 text-sm hover:text-cream-100 transition-colors mb-6"
            >
              <ArrowLeft size={14} /> All projects
            </Link>
            <h1 className="text-display-lg font-display text-cream-100">
              {project?.title || "Project Detail"}
            </h1>
            {project?.location && (
              <p className="text-warm-300 text-sm mt-2 flex items-center gap-1.5">
                <MapPin size={12} /> {project.location}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <section className="container mx-auto py-16 md:py-24">
          <div className="grid-swiss">
            {/* Description */}
            <div className="col-span-12 md:col-span-7">
              <AnimatedSection>
                {project?.description ? (
                  <div className="prose prose-stone max-w-none text-charcoal-700 leading-relaxed">
                    <PortableText value={project.description} />
                  </div>
                ) : (
                  <p className="text-warm-500">Project description coming soon.</p>
                )}
              </AnimatedSection>

              {/* Gallery */}
              {project?.gallery && project.gallery.length > 0 && (
                <AnimatedSection className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4" delay={100}>
                  {project.gallery.map((img, i) => (
                    <figure key={i} className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={urlFor(img).width(900).height(600).auto("format").url()}
                        alt={img.alt || `${project!.title} — Image ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {img.caption && (
                        <figcaption className="absolute bottom-0 left-0 right-0 p-3 bg-charcoal-900/70 text-cream-200 text-xs">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </AnimatedSection>
              )}
            </div>

            {/* Technical Sheet */}
            <aside
              className="col-span-12 md:col-span-4 md:col-start-9"
              aria-label="Project technical information"
            >
              <AnimatedSection delay={200}>
                <div className="border border-warm-200 p-6 sticky top-28">
                  <p className="eyebrow text-warm-400 mb-6">Technical Sheet</p>
                  <dl className="space-y-5">
                    {project?.projectType && (
                      <div>
                        <dt className="text-2xs text-warm-400 uppercase tracking-widest mb-1">Type</dt>
                        <dd className="text-sm text-charcoal-900">{TYPE_LABELS[project.projectType]}</dd>
                      </div>
                    )}
                    {project?.location && (
                      <div>
                        <dt className="text-2xs text-warm-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <MapPin size={10} /> Location
                        </dt>
                        <dd className="text-sm text-charcoal-900">{project.location}</dd>
                      </div>
                    )}
                    {project?.completionYear && (
                      <div>
                        <dt className="text-2xs text-warm-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <Calendar size={10} /> Year
                        </dt>
                        <dd className="text-sm text-charcoal-900">{project.completionYear}</dd>
                      </div>
                    )}
                    {project?.technicalSheet?.squareFootage && (
                      <div>
                        <dt className="text-2xs text-warm-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <Maximize2 size={10} /> Area
                        </dt>
                        <dd className="text-sm text-charcoal-900">
                          {project.technicalSheet.squareFootage.toLocaleString()} sq ft
                        </dd>
                      </div>
                    )}
                    {project?.technicalSheet?.duration && (
                      <div>
                        <dt className="text-2xs text-warm-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <Clock size={10} /> Duration
                        </dt>
                        <dd className="text-sm text-charcoal-900">{project.technicalSheet.duration}</dd>
                      </div>
                    )}
                    {project?.technicalSheet?.architect && (
                      <div>
                        <dt className="text-2xs text-warm-400 uppercase tracking-widest mb-1">Lead Architect</dt>
                        <dd className="text-sm text-charcoal-900">{project.technicalSheet.architect}</dd>
                      </div>
                    )}
                    {project?.technicalSheet?.client && (
                      <div>
                        <dt className="text-2xs text-warm-400 uppercase tracking-widest mb-1">Client</dt>
                        <dd className="text-sm text-charcoal-900">{project.technicalSheet.client}</dd>
                      </div>
                    )}
                    {project?.technicalSheet?.awards && (
                      <div>
                        <dt className="text-2xs text-warm-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <Award size={10} /> Recognition
                        </dt>
                        <dd className="text-sm text-charcoal-900">{project.technicalSheet.awards}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
