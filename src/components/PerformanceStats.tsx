"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: 380, suffix: " km/h", label: "Top Speed" },
  { value: 1050, suffix: " hp", label: "Horsepower" },
  { value: 2.1, suffix: " s", label: "0-100 km/h", isFloat: true },
  { value: 1200, suffix: " Nm", label: "Torque" },
];

export default function PerformanceStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate background glow
      gsap.to(".bg-glow", {
        opacity: 0.8,
        scale: 1.2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Setup initial state
        gsap.set(card, { opacity: 0, y: 100, rotationX: 15 });

        // Scroll animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.15,
        });

        // Counter animation
        const counterEl = card.querySelector(".counter-val");
        if (counterEl) {
          const targetVal = stats[index].value;
          const isFloat = stats[index].isFloat;
          tl.to(
            { val: 0 },
            {
              val: targetVal,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                if (counterEl) {
                  counterEl.textContent = isFloat
                    ? this.targets()[0].val.toFixed(1)
                    : Math.floor(this.targets()[0].val).toString();
                }
              },
            },
            "-=0.5"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden perspective-1000"
    >
      {/* Background Glows */}
      <div className="bg-glow absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-red-900/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2"></div>
      <div className="bg-glow absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-red-600 text-sm font-bold tracking-[0.4em] uppercase mb-4">
            Raw Power
          </h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            Performance
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 flex flex-col items-center justify-center transform-gpu transition-colors hover:bg-white/10 overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-red-600/20 to-transparent pointer-events-none"></div>
              
              <div className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-2 relative z-10 flex items-baseline">
                <span className="counter-val">0</span>
                <span className="text-red-500 text-3xl md:text-4xl ml-1">{stat.suffix}</span>
              </div>
              
              <div className="text-gray-400 text-sm tracking-[0.25em] uppercase font-bold text-center relative z-10">
                {stat.label}
              </div>
              
              {/* Accent Line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
