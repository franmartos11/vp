"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Renovation", value: "renovation" },
  { label: "Interior", value: "interior" },
];

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  projectType: string;
  completionYear?: number;
  location?: string;
  coverImage: { asset: { _ref: string }; alt?: string };
};

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
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
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            aria-pressed={activeFilter === f.value}
            className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
              activeFilter === f.value
                ? "bg-charcoal-900 text-cream-100"
                : "bg-transparent border border-warm-200 text-warm-500 hover:border-charcoal-900 hover:text-charcoal-900"
            }`}
          >
            {f.label}
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
              <motion.div key={project._id} variants={fadeInUp}>
                <ProjectCard project={project} priority={i < 3} />
              </motion.div>
            ))
          ) : (
            <motion.p
              variants={fadeInUp}
              className="col-span-3 text-warm-500 text-sm py-16 text-center"
            >
              No projects in this category yet.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
