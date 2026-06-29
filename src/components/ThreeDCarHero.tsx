"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, Float, Lightformer, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CarPlaceholder() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = state.pointer.x * 0.2;
      meshRef.current.rotation.x = -state.pointer.y * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.5, 0]}>
      {/* Main Body */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[1.8, 0.5, 4.2]} />
        <meshPhysicalMaterial 
          color="#111111"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Cabin */}
      <mesh castShadow receiveShadow position={[0, 0.8, -0.2]}>
        <boxGeometry args={[1.4, 0.4, 2.0]} />
        <meshPhysicalMaterial 
          color="#000000"
          metalness={1}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
      {/* Wheels */}
      {[-0.9, 0.9].map((x, i) => (
        [-1.4, 1.4].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.2, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
            <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
          </mesh>
        ))
      ))}
      
      {/* Glowing Energy Lines */}
      <mesh position={[0, 0.41, 0]}>
        <boxGeometry args={[1.82, 0.52, 4.22]} />
        <meshBasicMaterial color="#FF4500" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, 6]} fov={45} />
      
      <color attach="background" args={['#050505']} />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 5, 0]} intensity={10} color="#FF4500" angle={0.5} penumbra={1} castShadow />
      
      <Environment preset="city" blur={0.8}>
        <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
        <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[5, 1, -1]} scale={[10, 2, 1]} />
      </Environment>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <CarPlaceholder />
      </Float>

      <Sparkles 
        count={200} 
        scale={8} 
        size={2} 
        speed={0.4} 
        opacity={0.5} 
        color="#FF4500" 
      />
      
      {/* Grid Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
      
      <gridHelper args={[50, 50, '#FF4500', '#111']} position={[0, -0.99, 0]} />
    </>
  );
}

export default function ThreeDCarHero() {
  return (
    <div className="w-full h-screen relative bg-black overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <Scene />
      </Canvas>
      
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-10 bg-gradient-to-t from-black/80 via-transparent to-black/30">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter uppercase mb-4 drop-shadow-2xl">
          Velocity <span className="text-velocity-red">X</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 tracking-widest font-light uppercase">
          Experience the future of speed
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-[0.2em] text-gray-400 uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-velocity-red to-transparent"></div>
      </div>
    </div>
  );
}
