"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const STATS = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 40, suffix: "+", label: "Awards & Recognitions" },
];

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
  return (
    <section
      className="py-20 md:py-28 bg-brand-blue"
      aria-label="Company statistics"
    >
      <div className="container mx-auto">
        <AnimatedSection stagger className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-semibold text-cream-100 mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-cream-200/80 tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
