"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: Array<{ url: string; alt?: string; caption?: string }>;
}

export default function GalleryLightbox({ images }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    else if (delta < -50) setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    touchStartX.current = null;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
        {images.map((img, i) => (
          <figure
            key={i}
            className="relative aspect-[3/2] overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(i)}
          >
            <Image
              src={img.url}
              alt={img.alt || `Project Image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/10 transition-colors duration-300" />
            {img.caption && (
              <figcaption className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/40 to-transparent text-cream-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-charcoal-900/98 flex items-center justify-center backdrop-blur-md"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button 
            className="absolute top-6 right-6 text-warm-300 hover:text-white transition-colors z-[110]"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          <button
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-warm-300 hover:text-white transition-colors p-2 z-[110]"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
          
          <div className="relative w-full h-[80vh] max-w-6xl mx-12 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].alt || `Project Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {images[currentIndex].caption && (
              <div className="mt-4 text-center text-warm-300 text-sm max-w-2xl">
                {images[currentIndex].caption}
              </div>
            )}
          </div>
          
          <button
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-warm-300 hover:text-white transition-colors p-2 z-[110]"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-warm-400 text-sm tracking-widest font-mono">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
