"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CarTextOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate opacity for different sections based on scroll progress
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [0, 1, 1, 0]);

  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.3], [50, 0, -50]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.5], [50, 0, -50]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.5, 0.7], [50, 0, -50]);
  const y4 = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [50, 0, -50]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black" id="models">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background visual element */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-velocity-red/20 blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full border border-velocity-red/40 blur-md"></div>
        </div>

        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute w-full px-6 max-w-4xl mx-auto text-center z-10"
        >
          <h2 className="text-velocity-red text-sm font-bold tracking-[0.3em] uppercase mb-4">01 // The Origin</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Conceiving The <br />Impossible
          </h3>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            We didn't just build a car. We redefined the very physics of motion, breaking boundaries that stood for a century.
          </p>
        </motion.div>

        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute w-full px-6 max-w-4xl mx-auto text-center z-10"
        >
          <h2 className="text-velocity-red text-sm font-bold tracking-[0.3em] uppercase mb-4">02 // Performance</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Raw Untamed <br />Power
          </h3>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            1050 horsepower channeled through an intelligent quad-motor system, delivering sub-two-second acceleration.
          </p>
        </motion.div>

        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute w-full px-6 max-w-4xl mx-auto text-center z-10"
        >
          <h2 className="text-velocity-red text-sm font-bold tracking-[0.3em] uppercase mb-4">03 // Design</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Aerodynamic <br />Perfection
          </h3>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Sculpted by the wind. Every line, curve, and vent serves a critical aerodynamic purpose to keep you planted at 380 km/h.
          </p>
        </motion.div>

        <motion.div 
          style={{ opacity: opacity4, y: y4 }}
          className="absolute w-full px-6 max-w-4xl mx-auto text-center z-10"
        >
          <h2 className="text-velocity-red text-sm font-bold tracking-[0.3em] uppercase mb-4">04 // Technology</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Sentient <br />Machine
          </h3>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            An AI core that learns your driving style, adjusting suspension, torque vectoring, and aerodynamics in real-time milliseconds.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
