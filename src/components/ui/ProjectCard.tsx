"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cardHover, imageOverlay, textSlideUp } from "@/lib/animations";

interface ProjectCardProps {
  project: {
    _id?: string;
    id?: string;
    title: string;
    slug: string | { current: string };
    projectType: string;
    completionYear?: number | null;
    location?: string | null;
    coverImageUrl?: string | null;
    coverImage?: string | null;
  };
  priority?: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  renovation: "Renovation",
  interior: "Interior Design",
};

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const imageUrl = project.coverImage || project.coverImageUrl || "https://images.unsplash.com/photo-1600607687920-4e4d3e45c1b1?w=900&auto=format";
  const slugTarget = typeof project.slug === 'string' ? project.slug : project.slug.current;

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="group relative overflow-hidden bg-warm-200 block"
    >
      <Link
        href={`/portfolio/${slugTarget}`}
        aria-label={`View project: ${project.title}`}
        className="block"
      >
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Overlay */}
          <motion.div
            variants={imageOverlay}
            className="absolute inset-0 bg-charcoal-900/60"
          />

          {/* Hover content */}
          <motion.div
            variants={textSlideUp}
            className="absolute bottom-0 left-0 right-0 p-5 text-cream-100"
          >
            <p className="flex items-center gap-2 text-xs tracking-wide uppercase text-warm-300 mb-1">
              View project <ArrowRight size={12} />
            </p>
          </motion.div>
        </div>

        {/* Card meta */}
        <div className="p-5 bg-white border-b border-warm-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-sm font-medium text-charcoal-900 mb-1 leading-snug">
                {project.title}
              </h3>
              {project.location && (
                <p className="text-xs text-warm-500">{project.location}</p>
              )}
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              {project.completionYear && (
                <span className="text-xs text-warm-500">{project.completionYear}</span>
              )}
              <span className="text-2xs tracking-widest uppercase text-warm-400 bg-cream-200 px-2 py-0.5">
                {TYPE_LABELS[project.projectType] || project.projectType}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
