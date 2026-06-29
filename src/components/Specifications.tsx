"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const specsData = [
  {
    category: "Engine & Performance",
    details: [
      { label: "Engine Type", value: "4.0L Twin-Turbo V8 Hybrid" },
      { label: "Total Output", value: "1,050 hp" },
      { label: "Max Torque", value: "1,200 Nm" },
      { label: "Redline", value: "9,500 rpm" },
      { label: "0-100 km/h", value: "2.1 seconds" },
      { label: "Top Speed", value: "380 km/h (Electronically Limited)" },
    ],
  },
  {
    category: "Chassis & Dimensions",
    details: [
      { label: "Construction", value: "Carbon Fiber Monocoque" },
      { label: "Dry Weight", value: "1,350 kg" },
      { label: "Length", value: "4,650 mm" },
      { label: "Width", value: "2,050 mm" },
      { label: "Height", value: "1,150 mm" },
      { label: "Weight Distribution", value: "43% Front / 57% Rear" },
    ],
  },
  {
    category: "Transmission & Drivetrain",
    details: [
      { label: "Gearbox", value: "8-Speed Dual-Clutch" },
      { label: "Drive Type", value: "All-Wheel Drive with Torque Vectoring" },
      { label: "Differential", value: "Electronic Limited-Slip (eLSD)" },
    ],
  },
  {
    category: "Brakes & Suspension",
    details: [
      { label: "Front Brakes", value: "400mm Carbon-Ceramic, 6-Piston" },
      { label: "Rear Brakes", value: "380mm Carbon-Ceramic, 4-Piston" },
      { label: "Suspension", value: "Pushrod Double Wishbone, Active Dampers" },
    ],
  },
];

export default function Specifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="specifications" className="py-32 bg-black relative border-t border-white/5">
      {/* Background UI Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-cyan-500 text-sm font-bold tracking-[0.4em] uppercase mb-4">
            Technical Data
          </h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Specifications <span className="text-cyan-500/50 text-2xl align-top">V1.0</span>
          </h3>
        </div>

        {/* Futuristic Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {specsData.map((section, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="bg-neutral-900/50 backdrop-blur-md border border-cyan-900/30 rounded-xl p-8 hover:border-cyan-500/50 transition-colors duration-500 group relative overflow-hidden"
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-4 opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none"></div>

              <div className="flex items-center mb-6 border-b border-cyan-900/50 pb-4">
                <div className="w-2 h-2 bg-cyan-500 animate-pulse mr-3"></div>
                <h4 className="text-xl font-bold text-white uppercase tracking-wider">
                  {section.category}
                </h4>
              </div>

              <ul className="space-y-4 relative z-10">
                {section.details.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex flex-col sm:flex-row sm:justify-between sm:items-end group/item">
                    <span className="text-cyan-600/70 text-xs font-mono uppercase tracking-widest mb-1 sm:mb-0">
                      {item.label}
                    </span>
                    {/* Dotted connector for wide screens */}
                    <span className="hidden sm:block flex-grow border-b border-dotted border-cyan-900/30 mx-4 opacity-30 group-hover/item:opacity-100 group-hover/item:border-cyan-500/50 transition-all duration-300"></span>
                    <span className="text-gray-300 font-mono text-sm tracking-wide text-right">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-scanline {
          animation: scanline 2s linear infinite;
        }
      `}} />
    </section>
  );
}
