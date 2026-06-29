"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const defaultImages = [
  '/images/sequence/ezgif-frame-005.jpg',
  '/images/sequence/ezgif-frame-015.jpg',
  '/images/sequence/ezgif-frame-025.jpg',
  '/images/sequence/ezgif-frame-035.jpg',
  '/images/sequence/ezgif-frame-045.jpg',
  '/images/sequence/ezgif-frame-050.jpg',
];

export default function GallerySection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(defaultImages);
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.images && data.images.length > 0) {
          setImages(data.images.map((img: any) => img.url));
        }
      })
      .catch(err => console.error('Error fetching gallery images:', err));
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    galleryRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          delay: (index % 3) * 0.15, // Stagger rows
        }
      );
    });
  }, { scope: sectionRef, dependencies: [images] });

  return (
    <section ref={sectionRef} id="gallery" className="py-32 bg-neutral-950 relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-gray-500 text-sm font-bold tracking-[0.5em] uppercase mb-4">
              The Showroom
            </h2>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
              Gallery
            </h3>
          </div>
          <p className="text-gray-400 font-light max-w-sm text-right hidden md:block">
            Explore the raw beauty and perfect proportions of the Velocity-X from every angle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              ref={(el) => { galleryRef.current[index] = el; }}
              className="relative aspect-[4/3] cursor-pointer overflow-hidden group rounded-sm bg-neutral-900"
              onClick={() => setSelectedImg(src)}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/0 transition-all duration-700 z-10"></div>
              
              <Image 
                src={src} 
                alt={`Velocity X Gallery ${index + 1}`} 
                fill 
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100" 
              />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <div className="bg-black/50 backdrop-blur-md p-4 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <ZoomIn size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox - Kept simple React state for immediate feedback, minimal GSAP needed here as it's full screen block */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 md:p-12 backdrop-blur-3xl animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[101] bg-black/20 p-2 rounded-full backdrop-blur-md border border-white/10"
            onClick={() => setSelectedImg(null)}
          >
            <X size={32} />
          </button>
          
          <div
            className="relative w-full h-full max-w-7xl max-h-screen animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={selectedImg} alt="Enlarged gallery view" fill className="object-contain drop-shadow-2xl" />
          </div>
        </div>
      )}
    </section>
  );
}
