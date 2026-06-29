"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The sheer violence of the acceleration is matched only by the supernatural grip through the corners. It redefines physics.",
    author: "Marcus T.",
    role: "Professional GT Driver",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "As an aerodynamicist, I'm usually critical of street cars. But the downforce figures on the Velocity-X are simply staggering. It's a true race car for the road.",
    author: "Elena R.",
    role: "F1 Aerodynamics Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "I've owned every hypercar of the last decade. None of them connect you to the road quite like this. It's raw, visceral, and absolutely terrifying in the best way.",
    author: "James W.",
    role: "Collector & Enthusiast",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, rotationX: -10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          delay: i * 0.2,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-red-600 text-sm font-bold tracking-[0.4em] uppercase mb-4">
            The Verdict
          </h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Words of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Masters</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative bg-neutral-950/50 backdrop-blur-sm border border-white/5 p-10 rounded-2xl hover:bg-neutral-900 transition-colors duration-500 flex flex-col justify-between"
            >
              <div>
                <Quote size={40} className="text-white/10 mb-6 group-hover:text-red-600/30 transition-colors duration-500" />
                <p className="text-gray-300 font-light text-lg italic leading-relaxed mb-8">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex items-center space-x-4 border-t border-white/10 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                  <Image src={t.image} alt={t.author} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-wide">{t.author}</h4>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
