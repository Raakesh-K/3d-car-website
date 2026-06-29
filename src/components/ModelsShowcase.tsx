"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* ─────────────────────────────────────
   Scroll story sections
───────────────────────────────────── */
const SECTIONS = [
  {
    id: "s1",
    num: "01",
    tag: "The Masterpiece",
    title: "Precision\nCrafted",
    body: "The Velocity X is sculpted with an uncompromising focus on elegance and raw power. Every surface is wind-tunnel validated to achieve a drag coefficient of 0.28 Cd.",
    align: "left",
    modelPos:  { x: 3.4, z: -1.5 },
    modelRotY: -Math.PI / 5.5,
    specs: [
      { value: "0.28", unit: "Cd", label: "Drag Coeff" },
      { value: "4.2",  unit: "s",  label: "0–100 km/h" },
    ],
  },
  {
    id: "s2",
    num: "02",
    tag: "Active Aero",
    title: "Wind\nBender",
    body: "Adaptive diffusers and a deployable rear wing produce 420 kg of downforce at 250 km/h — every tyre glued to the tarmac at all times.",
    align: "right",
    modelPos:  { x: -2.8, z: 1.5 },
    modelRotY: Math.PI / 8,
    specs: [
      { value: "420",  unit: "kg",    label: "Downforce" },
      { value: "1.8",  unit: "G",     label: "Lateral G" },
    ],
  },
  {
    id: "s3",
    num: "03",
    tag: "Pure Power",
    title: "Future\nMobility",
    body: "Twin electric motors deliver 1 100 bhp with instant torque vectoring, governed by a neural-network ECU that samples at 10 000 Hz.",
    align: "left",
    modelPos:  { x: 3.2, z: 0.5 },
    modelRotY: -Math.PI / 3,
    specs: [
      { value: "1,100", unit: "bhp",   label: "Peak Power" },
      { value: "320",   unit: "km/h",  label: "Top Speed" },
    ],
  },
  {
    id: "s4",
    num: "04",
    tag: "The Cockpit",
    title: "Driver\nCentric",
    body: "A fighter-jet inspired cabin trimmed in Alcantara and exposed carbon fiber. The steering wheel features an integrated biometric sensor array.",
    align: "right",
    modelPos:  { x: -1.5, z: 3.5 },
    modelRotY: Math.PI / 2.2,
    specs: [
      { value: "12", unit: "in", label: "Holo Display" },
      { value: "900", unit: "W", label: "Audio System" },
    ],
  },
  {
    id: "s5",
    num: "05",
    tag: "Forged Precision",
    title: "Track\nReady",
    body: "Ultra-lightweight forged magnesium wheels house massive 400mm carbon-ceramic brakes, stopping the Velocity X from 100 km/h in just 29 meters.",
    align: "center",
    modelPos:  { x: 0, z: 2.5 },
    modelRotY: -Math.PI / 10,
    specs: [
      { value: "400", unit: "mm", label: "Carbon Rotors" },
      { value: "29", unit: "m", label: "100-0 km/h" },
    ],
  }
];

/* ═══════════════════════════════════
   Component
═══════════════════════════════════ */
export default function ModelsShowcase() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const sectionRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const modelRef      = useRef<THREE.Group | null>(null);
  const rendererRef   = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef      = useRef<THREE.Scene | null>(null);
  const cameraRef     = useRef<THREE.PerspectiveCamera | null>(null);
  const rafRef        = useRef<number | null>(null);

  const [isLoading,      setIsLoading]      = useState(true);
  const [loadPct,        setLoadPct]        = useState(0);
  const [activeSection,  setActiveSection]  = useState(0);

  /* ── Build Three.js scene ── */
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0; // Restored to a more realistic exposure
    rendererRef.current = renderer;

    /* Scene */
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    /* Rich environment for PBR reflections */
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;

    /* Camera */
    const camera = new THREE.PerspectiveCamera(40, canvas.offsetWidth / canvas.offsetHeight, 0.1, 200);
    camera.position.set(0, 1.2, 7.5); // Slightly lower camera
    camera.lookAt(0, -0.2, 0); // Point camera down towards the car
    cameraRef.current = camera;

    /* ── LIGHTING: Cinematic Studio ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(2, 8, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0001;
    scene.add(key);

    const rimL = new THREE.SpotLight(0x4488ff, 8, 0, Math.PI / 4, 0.8);
    rimL.position.set(-8, 4, -8);
    rimL.lookAt(0, 0, 0);
    scene.add(rimL);

    const rimR = new THREE.SpotLight(0xff4400, 8, 0, Math.PI / 4, 0.8);
    rimR.position.set(8, 4, -8);
    rimR.lookAt(0, 0, 0);
    scene.add(rimR);

    /* ── Floor ── */
    const floorGeo = new THREE.PlaneGeometry(200, 200);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x020202,
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 0.5,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.0;
    floor.receiveShadow = true;
    scene.add(floor);

    /* ── Load car model ── */
    const loader = new GLTFLoader();
    loader.load(
      "/scene.gltf/scene.gltf",
      (gltf) => {
        const model = gltf.scene;

        // Auto-fit
        const box    = new THREE.Box3().setFromObject(model);
        const size   = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale  = 5.4 / maxDim;
        model.scale.setScalar(scale);

        const box2    = new THREE.Box3().setFromObject(model);
        const center2 = box2.getCenter(new THREE.Vector3());
        model.position.sub(center2);
        model.position.y = -box2.min.y * scale + floor.position.y + 0.05;

        // Subtle PBR enhancement without breaking original colors
        model.traverse((child) => {
          if (!(child as THREE.Mesh).isMesh) return;
          const mesh = child as THREE.Mesh;
          mesh.castShadow    = true;
          mesh.receiveShadow = true;
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            if (!(m as THREE.MeshStandardMaterial).isMeshStandardMaterial) return;
            // Just slightly boost reflections
            (m as THREE.MeshStandardMaterial).envMapIntensity = 1.5;
            (m as THREE.MeshStandardMaterial).needsUpdate     = true;
          });
        });

        scene.add(model);
        modelRef.current = model;

        setIsLoading(false);

        /* Render loop */
        const animate = () => {
          renderer.render(scene, camera);
          rafRef.current = requestAnimationFrame(animate);
        };
        animate();
      },
      (prog) => { if (prog.total) setLoadPct(Math.round((prog.loaded / prog.total) * 100)); },
      (err)  => console.error("GLTF error:", err)
    );

    /* Resize */
    const onResize = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      pmrem.dispose();
    };
  }, []);

  /* ── GSAP scroll animations ── */
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || isLoading || !modelRef.current) return;
    const model = modelRef.current;

    SECTIONS.forEach((sec, i) => {
      const trigger = sectionRefs.current[i];
      if (!trigger) return;

      ScrollTrigger.create({
        trigger,
        start: "top 50%",
        end:   "bottom 50%",
        onEnter:     () => { setActiveSection(i); moveModel(i); },
        onEnterBack: () => { setActiveSection(i); moveModel(i); },
      });
    });

    function moveModel(i: number) {
      const s = SECTIONS[i];
      gsap.to(model.position, { x: s.modelPos.x, z: s.modelPos.z, duration: 1.8, ease: "power3.inOut", overwrite: "auto" });
      gsap.to(model.rotation, { y: s.modelRotY,                    duration: 1.8, ease: "power3.inOut", overwrite: "auto" });
    }

    // Floating text animations
    sectionRefs.current.forEach((ref) => {
      if (!ref) return;
      gsap.fromTo(ref.querySelectorAll(".ani"),
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { opacity: 1, y: 0,  filter: "blur(0px)", stagger: 0.15, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ref, start: "top 70%", toggleActions: "play none none reverse" } }
      );
    });

  }, { scope: containerRef, dependencies: [isLoading] });

  /* ════════════════════════════
     JSX
  ════════════════════════════ */
  return (
    <div ref={containerRef} className="relative w-full bg-black text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ───── Sticky 3D canvas (pure background) ───── */}
      <div className="sticky top-0 w-full h-screen z-0 overflow-hidden bg-black">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* ── LOADING ── */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black gap-8">
            <div style={{ position: "relative", animation: "mSpin 2.5s linear infinite" }}>
              <svg viewBox="0 0 100 100" width="96" height="96">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#111" strokeWidth="2"/>
                <circle cx="50" cy="50" r="44" fill="none" stroke="#FF4500"
                  strokeWidth="2" strokeLinecap="round"
                  strokeDasharray={`${loadPct*2.765} ${276.5-loadPct*2.765}`}
                  strokeDashoffset="69" style={{ transition: "stroke-dasharray .3s ease" }}/>
              </svg>
              <span style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
                fontWeight:300, fontSize:"1rem", color:"#fff", animation:"mCSpin 2.5s linear infinite" }}>
                {loadPct}%
              </span>
            </div>
            <p style={{ fontSize:".7rem", letterSpacing:".4em", textTransform:"uppercase", color:"rgba(255,255,255,.4)" }}>
              Loading Experience
            </p>
          </div>
        )}

        {/* ── Section progress dots ── */}
        {!isLoading && (
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4" style={{ zIndex:30 }}>
            {SECTIONS.map((_, i) => (
              <div key={i} style={{
                width: i === activeSection ? 4 : 2,
                height: i === activeSection ? 24 : 12,
                borderRadius: 4,
                background: i === activeSection ? "#FF4500" : "rgba(255,255,255,.2)",
                boxShadow: i === activeSection ? "0 0 10px #FF4500" : "none",
                transition: "all .6s cubic-bezier(0.16, 1, 0.3, 1)",
              }} />
            ))}
          </div>
        )}
      </div>

      {/* ───── Scrollable content (transparent overlays) ───── */}
      <div className="relative z-20 w-full" style={{ marginTop: "-100vh" }}>
        {SECTIONS.map((sec, i) => {
          const isLeft   = sec.align === "left";
          const isRight  = sec.align === "right";
          const isCenter = sec.align === "center";

          return (
            <div
              key={sec.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="h-screen flex flex-col justify-center px-12 md:px-24 pointer-events-none"
              style={{
                alignItems: isRight ? "flex-end" : isCenter ? "center" : "flex-start",
              }}
            >
              {/* ── Floating Text Block ── */}
              <div className="max-w-xl pointer-events-auto" style={{ textAlign: isRight ? "right" : isCenter ? "center" : "left" }}>
                
                {/* Eyebrow */}
                <p className="ani flex items-center gap-4 mb-6"
                  style={{
                    fontSize:".7rem", letterSpacing:".4em", textTransform:"uppercase",
                    color:"#FF4500", fontWeight:600,
                    justifyContent: isRight ? "flex-end" : isCenter ? "center" : "flex-start",
                  }}>
                  {!isRight && <span style={{ width:40, height:1, background:"#FF4500", opacity:0.6 }} />}
                  {sec.num} // {sec.tag}
                  {(isRight || isCenter) && <span style={{ width:40, height:1, background:"#FF4500", opacity:0.6 }} />}
                </p>

                {/* Main title */}
                <h2 className="ani"
                  style={{
                    fontSize:"clamp(3.5rem, 8vw, 7rem)",
                    fontWeight:900, textTransform:"uppercase",
                    letterSpacing:"-0.03em", lineHeight:.9,
                    color:"white", margin:"0 0 1.5rem 0",
                    textShadow:"0 4px 20px rgba(0,0,0,0.5)",
                  }}>
                  {sec.title.split("\n").map((line, li) => (
                    <span key={li} style={{ display:"block" }}>{line}</span>
                  ))}
                </h2>

                {/* Body text */}
                <p className="ani"
                  style={{
                    fontSize:"1.05rem", lineHeight:1.8,
                    color:"rgba(255,255,255,.7)", fontWeight:300,
                    letterSpacing:".01em", maxWidth:"28rem",
                    margin: isCenter ? "0 auto 2.5rem auto" : "0 0 2.5rem 0",
                    textShadow:"0 2px 10px rgba(0,0,0,0.8)",
                  }}>
                  {sec.body}
                </p>

                {/* ── Minimal Spec Indicators ── */}
                <div className="ani flex gap-8" style={{ justifyContent: isRight ? "flex-end" : isCenter ? "center" : "flex-start" }}>
                  {sec.specs.map((sp) => (
                    <div key={sp.label} style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                      <div style={{ fontSize:"2.2rem", fontWeight:800, letterSpacing:"-0.04em", lineHeight:1, color:"white", textShadow:"0 2px 10px rgba(0,0,0,0.5)" }}>
                        {sp.value}
                        {sp.unit && <span style={{ fontSize:"1rem", color:"#FF4500", marginLeft:4, fontWeight:600 }}>{sp.unit}</span>}
                      </div>
                      <div style={{ fontSize:".6rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(255,255,255,.5)", fontWeight:500 }}>
                        {sp.label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ── Global keyframes ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mSpin  { to { transform: rotate(360deg); } }
        @keyframes mCSpin { to { transform: rotate(-360deg); } }
        .ani { will-change: transform, opacity, filter; }
      `}} />
    </div>
  );
}
