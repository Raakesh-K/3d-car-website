"use client";

import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";

// Stylized Car Model that responds to config state
function ConfigurableCar({ config }: { config: any }) {
  return (
    <group dispose={null}>
      {/* Main Body */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[2.2, 0.5, 4.8]} />
        <meshPhysicalMaterial
          color={config.bodyColor}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
        />
      </mesh>
      
      {/* Cockpit / Glass */}
      <mesh castShadow receiveShadow position={[0, 1.1, -0.3]}>
        <boxGeometry args={[1.5, 0.45, 2.2]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={1}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.8, 0.6, 2.45]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshBasicMaterial color={config.lightingStyle === "Aggressive" ? "#ff0000" : "#ffffff"} />
      </mesh>
      <mesh position={[0.8, 0.6, 2.45]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshBasicMaterial color={config.lightingStyle === "Aggressive" ? "#ff0000" : "#ffffff"} />
      </mesh>

      {/* Wheels */}
      <Wheel position={[-1.2, 0.4, 1.6]} color={config.wheelColor} caliper={config.caliperColor} />
      <Wheel position={[1.2, 0.4, 1.6]} color={config.wheelColor} caliper={config.caliperColor} />
      <Wheel position={[-1.2, 0.4, -1.6]} color={config.wheelColor} caliper={config.caliperColor} />
      <Wheel position={[1.2, 0.4, -1.6]} color={config.wheelColor} caliper={config.caliperColor} />
    </group>
  );
}

function Wheel({ position, color, caliper }: { position: [number, number, number], color: string, caliper: string }) {
  return (
    <group position={position}>
      {/* Tire/Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.5} />
      </mesh>
      {/* Brake Caliper (abstracted as a small box) */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.4, 0.15, 0.2]} />
        <meshStandardMaterial color={caliper} roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

export default function CarConfigurator() {
  const [config, setConfig] = useState({
    bodyColor: "#cf0a0a",
    wheelColor: "#1a1a1a",
    caliperColor: "#eab308",
    lightingStyle: "Standard",
  });

  const bodyColors = [
    { name: "Velocity Red", value: "#cf0a0a" },
    { name: "Stealth Black", value: "#111111" },
    { name: "Arctic White", value: "#eeeeee" },
    { name: "Apex Blue", value: "#0284c7" },
  ];

  const wheelColors = [
    { name: "Carbon Black", value: "#1a1a1a" },
    { name: "Brushed Silver", value: "#a1a1aa" },
    { name: "Bronze", value: "#b45309" },
  ];

  const caliperColors = [
    { name: "Yellow", value: "#eab308" },
    { name: "Red", value: "#dc2626" },
    { name: "Silver", value: "#d4d4d8" },
  ];

  return (
    <section className="w-full h-screen bg-black flex flex-col md:flex-row border-t border-white/5">
      {/* 3D Canvas Area */}
      <div className="w-full md:w-2/3 h-[50vh] md:h-full relative cursor-grab active:cursor-grabbing">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [5, 3, 6], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6} shadows>
              <ConfigurableCar config={config} />
            </Stage>
            <OrbitControls
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2 - 0.05}
              minDistance={4}
              maxDistance={12}
            />
          </Suspense>
        </Canvas>
        
        <div className="absolute top-8 left-8 z-10 pointer-events-none">
          <h2 className="text-white text-3xl font-black uppercase tracking-wider">Studio</h2>
          <p className="text-gray-400 text-sm">Build your perfect machine.</p>
        </div>
      </div>

      {/* Configurator UI */}
      <div className="w-full md:w-1/3 h-[50vh] md:h-full bg-neutral-950 border-l border-white/10 overflow-y-auto p-8 custom-scrollbar">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
          Configuration
        </h3>

        {/* Body Color */}
        <div className="mb-8">
          <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Body Color</h4>
          <div className="flex flex-wrap gap-4">
            {bodyColors.map((color) => (
              <button
                key={color.name}
                onClick={() => setConfig({ ...config, bodyColor: color.value })}
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  config.bodyColor === color.value ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Wheel Options */}
        <div className="mb-8">
          <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Wheel Finish</h4>
          <div className="flex flex-wrap gap-4">
            {wheelColors.map((color) => (
              <button
                key={color.name}
                onClick={() => setConfig({ ...config, wheelColor: color.value })}
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  config.wheelColor === color.value ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Brake Calipers */}
        <div className="mb-8">
          <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Brake Calipers</h4>
          <div className="flex flex-wrap gap-4">
            {caliperColors.map((color) => (
              <button
                key={color.name}
                onClick={() => setConfig({ ...config, caliperColor: color.value })}
                className={`w-10 h-10 rounded-sm border-2 transition-all ${
                  config.caliperColor === color.value ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Lighting Style */}
        <div className="mb-12">
          <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Lighting Profile</h4>
          <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg">
            {["Standard", "Aggressive"].map((style) => (
              <button
                key={style}
                onClick={() => setConfig({ ...config, lightingStyle: style })}
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${
                  config.lightingStyle === style ? "bg-white text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-colors">
          Reserve This Build
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0a0a0a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}} />
    </section>
  );
}
