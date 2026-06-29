"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const features = [
  { title: "Premium Alcantara", desc: "Hand-stitched luxury materials covering every touchpoint." },
  { title: "Holographic Dash", desc: "Augmented reality displays project critical data directly into your line of sight." },
  { title: "F1-Inspired Wheel", desc: "Carbon fiber steering wheel with integrated drive-mode selectors." },
  { title: "Ambient Sync", desc: "Cabin lighting that adapts to your driving mode and heart rate." },
];

export default function InteriorExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect on the background image
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Fade in text cards
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-black overflow-hidden">
      {/* Background Image Container with Parallax */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Gradients to blend with other sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center py-32">
        <div className="max-w-2xl">
          <h2 className="text-gray-400 text-sm font-bold tracking-[0.4em] uppercase mb-4">
            Driver-Centric
          </h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-8 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-600">Cockpit</span>
          </h3>
          <p className="text-xl text-gray-300 font-light mb-16 max-w-lg leading-relaxed">
            Step inside a sanctuary of speed. Aerospace-grade carbon fiber meets hand-stitched leather in an environment designed entirely around the driver's focus and control.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                ref={(el) => { textRefs.current[i] = el; }}
                className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/5 hover:border-white/30 transition-colors"
              >
                <div className="w-8 h-1 bg-amber-600 mb-4"></div>
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
