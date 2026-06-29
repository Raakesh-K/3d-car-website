"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Activity, Wind, Monitor, Zap } from "lucide-react";

const technologies = [
  {
    icon: <Cpu size={40} />,
    title: "AI Driving Assistance",
    description:
      "A neural network processing thousands of inputs per second to perfectly balance power delivery to each wheel independently, predicting conditions before they happen.",
    color: "from-blue-600 to-cyan-400",
  },
  {
    icon: <Activity size={40} />,
    title: "Adaptive Suspension",
    description:
      "Magnetorheological dampers that read the road surface 1000 times per second, adjusting stiffness in real-time for supreme control and comfort.",
    color: "from-red-600 to-orange-500",
  },
  {
    icon: <Wind size={40} />,
    title: "Intelligent Aerodynamics",
    description:
      "Active aero systems that adapt continuously to speed and cornering forces, generating massive downforce exactly when and where it's needed.",
    color: "from-purple-600 to-pink-500",
  },
  {
    icon: <Monitor size={40} />,
    title: "Smart Cockpit Systems",
    description:
      "Holographic HUDs and biometric sensors that adapt the cabin environment to the driver's state, merging human and machine into a single entity.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: <Zap size={40} />,
    title: "Advanced Braking",
    description:
      "Carbon-ceramic discs paired with kinetic energy recovery, providing fade-free stopping power and recharging the hybrid systems instantly.",
    color: "from-yellow-500 to-amber-600",
  },
];

export default function FeatureShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-neutral-950 relative overflow-hidden">


      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-blue-500 text-sm font-bold tracking-[0.4em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
            Technology
          </h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Integrated</span>
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-xl pointer-events-none ${tech.color}`}></div>
              
              <div className="relative h-full bg-white/5 border border-white/10 hover:border-white/30 backdrop-blur-md rounded-3xl p-8 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)]">
                {/* Glowing Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} p-[1px] mb-8`}>
                  <div className="w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center">
                    <div className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                  </div>
                </div>

                <h4 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                  {tech.title}
                </h4>
                <p className="text-gray-400 leading-relaxed font-light">
                  {tech.description}
                </p>
                
                {/* Tech Accent Lines */}
                <div className="absolute top-4 right-4 flex space-x-1 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
