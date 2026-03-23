"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useTranslations } from "next-intl";

const STATS = [
  { value: 120, suffix: "+", labelKey: "projects_completed" },
  { value: 15, suffix: "+", labelKey: "years_experience" },
  { value: 98, suffix: "%", labelKey: "client_satisfaction" },
  { value: 40, suffix: "+", labelKey: "awards" },
] as const;

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * ease));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const t = useTranslations("StatsSection");
  return (
    <section
      className="py-20 md:py-28 bg-charcoal-900 border-t border-charcoal-800"
      aria-label="Company statistics"
    >
      <div className="container mx-auto">
        <AnimatedSection stagger className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
          {STATS.map((stat) => (
            <div key={stat.labelKey} className="text-center group">
              <p className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 group-hover:scale-110 transition-transform duration-500">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <div className="w-8 h-px bg-warm-500 mx-auto mb-4" />
              <p className="text-xs text-warm-500 tracking-widest uppercase font-mono">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
