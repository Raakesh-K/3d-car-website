"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const FRAME_COUNT = 50;

const getFrameSrc = (index: number) => {
  const num = (index + 1).toString().padStart(3, "0");
  return `/images/sequence/ezgif-frame-${num}.jpg`;
};

/* ─── Feature hotspot data ─── */
const HOTSPOTS = [
  {
    frameRange: [0, 10],
    title: "Sculpted Front Profile",
    subtitle: "Aerodynamic Precision",
    description:
      "Active air intakes channel airflow through precision-cut carbon fiber vanes, reducing drag coefficient to an industry-leading 0.28 Cd.",
    position: "left" as const,
    accent: "#FF4500",
  },
  {
    frameRange: [11, 22],
    title: "Lateral Design Language",
    subtitle: "Form Meets Function",
    description:
      "Flowing body lines conceal active aerodynamic surfaces that deploy at 120 km/h, increasing downforce by 40%.",
    position: "right" as const,
    accent: "#FF6B35",
  },
  {
    frameRange: [23, 35],
    title: "Rear Power Stance",
    subtitle: "Engineered Aggression",
    description:
      "Quad exhaust system integrated into a full-width rear diffuser. Active rear wing adjusts angle in real-time for optimal downforce.",
    position: "left" as const,
    accent: "#E84118",
  },
  {
    frameRange: [36, 49],
    title: "Complete 360° View",
    subtitle: "Every Angle Perfected",
    description:
      "From every perspective, the Velocity X commands attention. Each surface has been wind-tunnel tested and track validated.",
    position: "right" as const,
    accent: "#FF7043",
  },
];

export default function ThreeDShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameIndexRef = useRef(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Determine which hotspot to show
  const activeHotspot = HOTSPOTS.find(
    (h) => currentFrame >= h.frameRange[0] && currentFrame <= h.frameRange[1]
  );

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setIsLoaded(true);
        }
      };
      images[i] = img;
    }
  }, []);

  // Draw a frame to canvas
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      if (isLoaded) renderFrame(frameIndexRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isLoaded, renderFrame]);

  // GSAP scroll-driven frame animation
  useGSAP(
    () => {
      if (!isLoaded || !containerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      renderFrame(0);
      const frameObj = { frame: 0 };

      gsap.to(frameObj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
        onUpdate() {
          const idx = Math.round(frameObj.frame);
          frameIndexRef.current = idx;
          setCurrentFrame(idx);
          renderFrame(idx);
        },
      });
    },
    { scope: containerRef, dependencies: [isLoaded] }
  );

  return (
    <section
      ref={containerRef}
      id="360-showcase"
      className="relative w-full bg-black"
      style={{ height: "500vh" }}
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden"
      >
        {/* ── Loading Screen ── */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
            {/* Rotating ring loader */}
            <div className="showcase-loader-ring">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#loaderGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${loadProgress * 2.64} ${264 - loadProgress * 2.64}`}
                  strokeDashoffset="66"
                  style={{ transition: "stroke-dasharray 0.3s ease" }}
                />
                <defs>
                  <linearGradient
                    id="loaderGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FF4500" />
                    <stop offset="100%" stopColor="#FF7043" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="showcase-loader-pct">{loadProgress}%</span>
            </div>
            <p className="showcase-loader-label">Loading 360° Experience</p>
          </div>
        )}

        {/* ── Canvas ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 10 }}
        />

        {/* ── Cinematic Vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 15,
            background:
              "radial-gradient(ellipse 80% 80% at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* ── Top bar: Section label + frame counter ── */}
        <div
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{ zIndex: 30 }}
        >
          <div className="showcase-top-bar">
            <div className="showcase-section-label">
              <span className="showcase-label-dot" />
              <span className="showcase-label-text">Interactive 360°</span>
            </div>
            <div className="showcase-frame-counter">
              <span className="showcase-frame-num">
                {String(currentFrame + 1).padStart(2, "0")}
              </span>
              <span className="showcase-frame-sep">/</span>
              <span className="showcase-frame-total">{FRAME_COUNT}</span>
            </div>
          </div>
        </div>

        {/* ── Main Title ── */}
        <div
          className="absolute top-16 left-0 w-full pointer-events-none"
          style={{ zIndex: 30 }}
        >
          <div className="showcase-title-block">
            <h2 className="showcase-main-title">
              360°
              <br />
              <span className="showcase-title-gradient">Explore</span>
            </h2>
            <p className="showcase-main-subtitle">
              Scroll to orbit the vehicle and discover every sculpted surface.
            </p>
          </div>
        </div>

        {/* ── Dynamic Feature Card ── */}
        {activeHotspot && (
          <div
            key={activeHotspot.title}
            className={`showcase-feature-card ${activeHotspot.position === "left" ? "showcase-card-left" : "showcase-card-right"}`}
            style={{ zIndex: 30 }}
          >
            <div
              className="showcase-card-accent"
              style={{ background: activeHotspot.accent }}
            />
            <div className="showcase-card-content">
              <span className="showcase-card-eyebrow">
                {activeHotspot.subtitle}
              </span>
              <h3 className="showcase-card-title">{activeHotspot.title}</h3>
              <p className="showcase-card-description">
                {activeHotspot.description}
              </p>
            </div>
          </div>
        )}

        {/* ── Scroll Progress Ring (bottom-right) ── */}
        <div className="showcase-progress-ring" style={{ zIndex: 30 }}>
          <svg viewBox="0 0 60 60" width="52" height="52">
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <circle
              cx="30"
              cy="30"
              r="26"
              fill="none"
              stroke="#FF4500"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${scrollProgress * 163.36} ${163.36 - scrollProgress * 163.36}`}
              strokeDashoffset="40.84"
              style={{ transition: "stroke-dasharray 0.15s ease" }}
            />
          </svg>
          <span className="showcase-progress-label">
            {Math.round(scrollProgress * 360)}°
          </span>
        </div>

        {/* ── Frame Tick Bar (bottom center) ── */}
        <div className="showcase-tick-bar" style={{ zIndex: 30 }}>
          {Array.from({ length: FRAME_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`showcase-tick ${i <= currentFrame ? "showcase-tick-active" : ""}`}
            />
          ))}
        </div>

        {/* ── Scroll indicator (bottom center) ── */}
        <div className="showcase-scroll-hint" style={{ zIndex: 30 }}>
          <div className="showcase-scroll-line" />
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="showcase-scroll-chevron"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
          <span className="showcase-scroll-text">Scroll to rotate</span>
        </div>

        {/* ── Feature badges (desktop, bottom-left) ── */}
        <div className="showcase-badges" style={{ zIndex: 30 }}>
          {[
            { color: "#FF4500", label: "Carbon Fiber Body" },
            { color: "#448AFF", label: "Active Aerodynamics" },
            { color: "#FFD740", label: "Track Forged Wheels" },
          ].map((badge) => (
            <div key={badge.label} className="showcase-badge">
              <span
                className="showcase-badge-dot"
                style={{ background: badge.color }}
              />
              <span className="showcase-badge-label">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* ── Bottom gradient fade ── */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            height: "10rem",
            background: "linear-gradient(to top, black, transparent)",
            zIndex: 20,
          }}
        />
        {/* ── Top gradient fade ── */}
        <div
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{
            height: "8rem",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
            zIndex: 20,
          }}
        />
      </div>
    </section>
  );
}
