"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const steps = [
  {
    title: "1. The Vision",
    desc: "It begins with a single line on paper. Concept sketches evolve into digital wireframes, dictating aerodynamic efficiency before a single piece of metal is cast.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "2. Carbon Forging",
    desc: "The monocoque chassis is baked in high-pressure autoclaves. Thousands of layers of carbon fiber are fused to create a shell stronger than steel yet light as a feather.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "3. Precision Assembly",
    desc: "Master technicians hand-assemble the powertrain. Each engine is built by a single engineer, signed as a testament to perfection and immense power.",
    image: "https://images.unsplash.com/photo-1619551734325-81aaf323686c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "4. Final Polish",
    desc: "Multiple layers of custom-formulated paint are applied by robots, then hand-polished for 50 hours to achieve an impossible, mirror-like depth.",
    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
];

export default function ManufacturingProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Crossfade images and scroll through text based on the 400vh container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    textsRef.current.forEach((text, i) => {
      if (!text || i === 0) return;
      
      // Animate text coming in
      tl.to(textsRef.current[i - 1], { opacity: 0, y: -50, duration: 1 }, `step${i}`);
      tl.fromTo(text, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, `step${i}`);

      // Animate image crossfade
      tl.to(imagesRef.current[i - 1], { opacity: 0, scale: 1.1, duration: 1 }, `step${i}`);
      tl.fromTo(imagesRef.current[i], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, `step${i}`);
    });

  }, { scope: containerRef });

  return (
    // 400vh gives enough room to scroll through the 4 steps
    <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
      
      {/* Sticky container stays on screen while we scroll the 400vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { imagesRef.current[i] = el; }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('${step.image}')`,
                opacity: i === 0 ? 1 : 0, // First image visible initially
              }}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center h-full">
          {/* Left Side: Title */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0">
            <h2 className="text-gray-400 text-sm font-bold tracking-[0.4em] uppercase mb-4">
              The Genesis
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Forged in <br /> <span className="text-red-600">Fire & Carbon</span>
            </h3>
          </div>

          {/* Right Side: Step Text Container */}
          <div className="w-full md:w-2/3 h-64 relative">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { textsRef.current[i] = el; }}
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? 'translateY(0)' : 'translateY(50px)' }}
              >
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-6 border-l-4 border-red-600 pl-6">
                  {step.title}
                </h4>
                <p className="text-xl text-gray-300 font-light leading-relaxed pl-6 max-w-2xl">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
