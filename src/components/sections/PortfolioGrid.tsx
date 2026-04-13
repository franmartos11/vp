"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useTranslations } from "next-intl";

const FILTERS = [
  "all",
  "residential",
  "commercial",
  "mid-rise",
  "shop-drawing"
] as const;

type Project = {
  id: string;
  title: string;
  slug: string | { current: string };
  projectType: string;
  completionYear?: number | null;
  location?: string | null;
  description?: string | null;
  coverImage?: string | null;
  coverImageUrl?: string | null;
};

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const t = useTranslations("PortfolioGrid");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.projectType === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex flex-wrap gap-2 mb-12"
        role="group"
        aria-label="Filter projects by type"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            aria-pressed={activeFilter === f}
            className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
              activeFilter === f
                ? "bg-brand-blue text-white"
                : "bg-transparent border border-warm-200 text-warm-500 hover:border-brand-blue hover:text-brand-blue"
            }`}
          >
            {t(`filters.${f}` as any)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <ProjectCard project={project as any} priority={i < 3} />
              </motion.div>
            ))
          ) : (
            <motion.p
              variants={fadeInUp}
              className="col-span-3 text-warm-500 text-sm py-16 text-center"
            >
              {t('no_projects')}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
