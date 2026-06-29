"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const FRAME_COUNT = 50;

export default function CarFrameSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits (e.g. 001, 002)
      const num = i.toString().padStart(3, '0');
      img.src = `/images/sequence/ezgif-frame-${num}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (imagesLoaded) renderFrame(frameIndexRef.current);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  useGSAP(() => {
    if (!imagesLoaded || !containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    renderFrame(0);
    const frameObj = { frame: 0 };
    
    gsap.to(frameObj, {
      frame: FRAME_COUNT - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom', // Scrubs through the 400vh container
        scrub: 0.5, // 0.5s smoothing
      },
      onUpdate: () => {
        const idx = Math.round(frameObj.frame);
        frameIndexRef.current = idx;
        renderFrame(idx);
      }
    });

  }, { scope: containerRef, dependencies: [imagesLoaded] });

  return (
    // 400vh gives room to scroll while the inner container sticks
    <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
      
      {/* Sticky container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-velocity-red border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-400 tracking-widest uppercase text-sm">Loading Sequence...</span>
            </div>
          </div>
        )}
        
        <canvas 
          ref={canvasRef} 
          className="block w-full h-full object-cover"
        />

        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-end pb-24 px-8 md:px-24 bg-gradient-to-t from-black/80 via-transparent to-transparent">
           <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-xl">
                Born From Fire
              </h2>
              <p className="text-lg text-gray-300 md:text-xl font-light">
                Witness the precise engineering of the Velocity X lineup. Every curve is optimized for aerodynamic perfection.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}
