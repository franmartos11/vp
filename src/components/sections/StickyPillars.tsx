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
    <section className="py-24 md:py-32 bg-cream-50" aria-labelledby="pillars-heading">
      <div className="container mx-auto px-6">
        <SectionHeading
           eyebrow={t('eyebrow')}
           title={t('title')}
           subtitle={t('subtitle')}
           className="mb-16"
        />

        <div className="flex flex-col lg:flex-row h-[700px] lg:h-[600px] w-full gap-4">
          {[0, 1, 2].map((index) => {
            const title = t(`pillars.${index}.title` as any);
            const description = t(`pillars.${index}.description` as any);
            const isActive = hoveredIndex === index || (hoveredIndex === null && index === 0);
            return (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className="relative overflow-hidden cursor-pointer flex-1"
                animate={{
                   flex: isActive ? 4 : 1
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                 {/* Background Image */}
                <Image 
                   src={images[index]}
                   alt={title}
                   fill
                   unoptimized
                   className={`object-cover transition-transform duration-[10s] ease-out ${isActive ? 'scale-105' : 'scale-100 grayscale'}`}
                />
                
                {/* Gradient Overlay */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive 
                      ? 'bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent opacity-100' 
                      : 'bg-charcoal-900/80 opacity-100'
                  }`} 
                />

                {/* Content */}
                <div className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-end transition-all duration-700`}>
                   <div className="flex items-center gap-6 mb-4">
                     <span className={`font-mono tracking-widest text-sm transition-colors duration-500 ${isActive ? 'text-brand-blue' : 'text-warm-400'}`}>
                       {String(index + 1).padStart(2, '0')}
                     </span>
                     <div className={`h-[1px] w-12 bg-warm-400/30 transition-all duration-500 ${isActive ? 'w-24 bg-brand-blue/50' : ''}`} />
                     <h3 className={`text-2xl md:text-3xl font-display whitespace-nowrap transition-colors duration-500 ${isActive ? 'text-white' : 'text-warm-200'}`}>
                       {title}
                     </h3>
                   </div>
                   
                   <AnimatePresence>
                     {isActive && (
                       <motion.p 
                         initial={{ opacity: 0, y: 30 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: 20 }}
                         transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                         className="text-cream-50/90 text-sm md:text-lg font-light leading-relaxed max-w-md ml-[4.5rem]"
                       >
                         {description}
                       </motion.p>
                     )}
                   </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
