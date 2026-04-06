"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTranslations } from "next-intl";



const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format",
];

export function StickyPillars() {
  const t = useTranslations('StickyPillars');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-charcoal-900" aria-labelledby="pillars-heading">
      <div className="container mx-auto px-6">
        <SectionHeading
           eyebrow={t('eyebrow')}
           title={t('title')}
           subtitle={t('subtitle')}
           className="mb-16"
           light
        />

        <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px] lg:h-[600px] w-full gap-2 lg:gap-4">
          {[0, 1, 2].map((index) => {
            const title = t(`pillars.${index}.title` as any);
            const description = t(`pillars.${index}.description` as any);
            const isActive = hoveredIndex === index || (hoveredIndex === null && index === 0);
            return (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
                className="relative overflow-hidden cursor-pointer flex-1 min-h-[220px] md:min-h-[300px] lg:min-h-0 rounded-lg group border border-charcoal-800/10"
                animate={{
                   flex: isActive ? 6 : 1
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                 {/* Background Image */}
                <Image 
                   src={images[index]}
                   alt={title}
                   fill
                   unoptimized
                   className={`object-cover transition-transform duration-[10s] ease-out lg:block ${isActive ? 'scale-105' : 'scale-100 lg:grayscale lg:opacity-60'}`}
                />
                
                {/* Base Dark Overlay for overall contrast */}
                <div className={`absolute inset-0 transition-all duration-700 ${isActive ? 'bg-charcoal-950/50 lg:bg-charcoal-950/30' : 'bg-charcoal-950/65 lg:bg-charcoal-950/50'}`} />
                
                {/* Heavy Gradient Overlay for Text Area */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-t from-charcoal-950 via-charcoal-950/90 to-transparent lg:bg-none ${
                    isActive 
                      ? 'lg:bg-gradient-to-t lg:from-charcoal-950 lg:via-charcoal-950/80 lg:to-charcoal-950/10 lg:opacity-100' 
                      : 'lg:bg-charcoal-950/80 lg:opacity-100'
                  }`} 
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end transition-all duration-700 z-10 w-full h-full text-left">
                   
                   {/* Mobile Layout Title (Always visible, wrapping okay) */}
                   <div className="lg:hidden flex flex-col gap-2 mb-2 relative z-10">
                     <span className="font-mono tracking-widest text-xs text-brand-blue uppercase drop-shadow-md">
                       0{index + 1}
                     </span>
                     <h3 className="text-2xl font-display text-white drop-shadow-lg leading-tight">
                       {title}
                     </h3>
                     <p className="text-white text-sm font-light leading-relaxed max-w-sm drop-shadow-[0_4px_12px_rgba(0,0,0,1)] line-clamp-3">
                       {description}
                     </p>
                   </div>

                   {/* Desktop Layout Title & Description */}
                   <div className="hidden lg:flex flex-col w-full relative z-10 justify-end h-full">
                     <div className={`flex transition-all duration-700 w-full ${isActive ? 'flex-row items-center gap-6 mb-4' : 'flex-col items-center gap-4 pb-4'}`}>
                       <span className={`font-mono tracking-widest text-sm transition-colors duration-500 shrink-0 ${isActive ? 'text-brand-blue' : 'text-brand-blue'}`}>
                         {String(index + 1).padStart(2, '0')}
                       </span>
                       <div className={`bg-brand-blue/40 transition-all duration-700 shrink-0 ${isActive ? 'h-[1px] w-12' : 'w-[1px] h-12'}`} />
                       <h3 className={`font-display transition-all duration-700 whitespace-nowrap overflow-hidden drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${isActive ? 'text-4xl text-white tracking-wide' : 'text-2xl text-warm-100 [writing-mode:vertical-rl] rotate-180 tracking-widest opacity-80'}`}>
                         {title}
                       </h3>
                     </div>
                     
                     <div 
                       className={`overflow-hidden transition-all duration-700 ease-in-out w-full ${isActive ? 'max-h-48 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}
                     >
                        <p className="text-white font-light leading-relaxed max-w-[420px] ml-[5.5rem] drop-shadow-[0_4px_12px_rgba(0,0,0,1)] text-base">
                          {description}
                        </p>
                     </div>
                   </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
