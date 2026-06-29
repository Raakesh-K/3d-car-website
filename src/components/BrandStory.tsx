"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | HTMLParagraphElement)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate text elements
      textRefs.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });

      // Animate the image panel
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0, clipPath: "inset(0 100% 0 0)" },
        {
          scale: 1,
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden"
    >
      {/* Left Text Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 z-10">
        <h2
          ref={(el) => {
            if (el) textRefs.current[0] = el;
          }}
          className="text-sm tracking-[0.3em] text-gray-400 mb-6 uppercase"
        >
          Our Philosophy
        </h2>
        <h3
          ref={(el) => {
            if (el) textRefs.current[1] = el;
          }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
        >
          Engineering the <br /> <span className="text-red-600">Impossible.</span>
        </h3>
        <p
          ref={(el) => {
            if (el) textRefs.current[2] = el;
          }}
          className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl font-light"
        >
          We don't just build cars; we sculpt adrenaline. At Velocity, every curve is dictated by the wind, and every component is forged with an obsession for speed and perfection.
        </p>
        <p
          ref={(el) => {
            if (el) textRefs.current[3] = el;
          }}
          className="text-lg md:text-xl text-gray-400 max-w-xl font-light"
        >
          Our relentless pursuit of innovation pushes the boundaries of automotive engineering, merging futuristic design with raw, untamed performance.
        </p>
      </div>

      {/* Right Image/Cinematic Split */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden group">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Overlay gradient for smooth transition on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black to-transparent opacity-80 md:opacity-50"></div>
      </div>
    </section>
  );
}
