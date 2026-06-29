"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

function ParticleBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <Sparkles count={500} scale={12} size={2} speed={0.4} opacity={0.5} color="#ff3333" />
      <Sparkles count={200} scale={10} size={1} speed={0.8} opacity={0.3} color="#ffffff" />
    </Canvas>
  );
}

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        }
      }
    );

    gsap.fromTo(
      carRef.current,
      { opacity: 0, scale: 0.9, y: 100 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-[120vh] bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/10">
      
      {/* 3D Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>
      
      {/* Studio Lighting Effects */}
      <div className="absolute top-0 w-[800px] h-[300px] bg-red-600/20 blur-[120px] rounded-[100%] pointer-events-none"></div>
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

      {/* Cinematic Car Image (Placeholder for studio shot) */}
      <div ref={carRef} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-3/4 z-10 pointer-events-none opacity-80">
        <div className="relative w-full h-full">
           {/* Using a generic high-quality dark car image for the studio effect */}
          <Image 
            src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Velocity X Studio" 
            fill 
            className="object-cover object-bottom [mask-image:linear-gradient(to_top,transparent_0%,black_100%)] mix-blend-screen grayscale contrast-150" 
          />
        </div>
      </div>

      <div ref={contentRef} className="relative z-20 text-center px-6 -mt-32">
        <h2 className="text-gray-400 text-sm font-bold tracking-[0.5em] uppercase mb-6">
          The Final Step
        </h2>
        <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8 drop-shadow-2xl leading-none">
          Claim Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
            Destiny
          </span>
        </h3>
        
        <p className="text-gray-300 max-w-xl mx-auto mb-12 font-light text-lg">
          Production is strictly limited to 500 units globally. Secure your allocation today or book a private viewing at our headquarters.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="w-full sm:w-auto px-12 py-5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest transition-all rounded-sm shadow-[0_0_30px_-5px_rgba(220,38,38,0.6)] hover:shadow-[0_0_50px_-5px_rgba(220,38,38,0.8)] hover:scale-105">
            Configure Yours
          </button>
          
          <button className="w-full sm:w-auto px-12 py-5 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest transition-all rounded-sm backdrop-blur-md border border-white/20 hover:border-white/50 hover:scale-105">
            Book Viewing
          </button>
        </div>
      </div>
    </section>
  );
}
