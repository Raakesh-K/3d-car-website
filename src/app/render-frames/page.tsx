"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const FRAME_COUNT = 50;
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

export default function RenderFramesPage() {
  const [status, setStatus] = useState("Initializing...");
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    async function renderAllFrames() {
      setStatus("Setting up Three.js scene...");

      // Create renderer
      const canvas = canvasRef.current!;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        preserveDrawingBuffer: true,
      });
      renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
      renderer.setPixelRatio(1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // Create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);

      // Camera
      const camera = new THREE.PerspectiveCamera(45, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 100);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
      dirLight.position.set(5, 8, 5);
      dirLight.castShadow = true;
      scene.add(dirLight);

      const dirLight2 = new THREE.DirectionalLight(0x8888ff, 0.8);
      dirLight2.position.set(-5, 3, -5);
      scene.add(dirLight2);

      const spotLight = new THREE.SpotLight(0xff4500, 3.0, 30, Math.PI / 4, 0.5);
      spotLight.position.set(0, 10, 0);
      scene.add(spotLight);

      // Rim lights
      const rimLight1 = new THREE.PointLight(0xff4500, 2, 20);
      rimLight1.position.set(-5, 2, 0);
      scene.add(rimLight1);

      const rimLight2 = new THREE.PointLight(0x4488ff, 1.5, 20);
      rimLight2.position.set(5, 2, 0);
      scene.add(rimLight2);

      // Ground plane
      const groundGeo = new THREE.PlaneGeometry(50, 50);
      const groundMat = new THREE.MeshStandardMaterial({
        color: 0x080808,
        metalness: 0.8,
        roughness: 0.2,
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.01;
      ground.receiveShadow = true;
      scene.add(ground);

      // Load GLTF model
      setStatus("Loading 3D car model...");
      const loader = new GLTFLoader();

      let model: THREE.Group;
      try {
        const gltf = await new Promise<{ scene: THREE.Group }>((resolve, reject) => {
          loader.load(
            "/scene.gltf/scene.gltf",
            (g) => resolve(g),
            (progressEvent) => {
              if (progressEvent.total > 0) {
                const pct = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setStatus(`Loading model... ${pct}%`);
              }
            },
            (err) => reject(err)
          );
        });
        model = gltf.scene;
      } catch (err) {
        setStatus(`Error loading model: ${err}`);
        return;
      }

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3.0 / maxDim;
      model.scale.setScalar(scale);

      // Recompute after scaling
      const box2 = new THREE.Box3().setFromObject(model);
      const center2 = box2.getCenter(new THREE.Vector3());
      model.position.sub(center2);
      model.position.y = -box2.min.y * scale + 0; // sit on ground

      // Enable shadows on the model
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(model);

      // Camera orbit parameters
      const cameraRadius = 5.5;
      const cameraHeight = 2.0;
      const lookAtY = 0.8;

      setStatus("Rendering frames...");

      // Render each frame
      for (let i = 0; i < FRAME_COUNT; i++) {
        const angle = (i / FRAME_COUNT) * Math.PI * 2;
        camera.position.set(
          Math.sin(angle) * cameraRadius,
          cameraHeight,
          Math.cos(angle) * cameraRadius
        );
        camera.lookAt(0, lookAtY, 0);

        renderer.render(scene, camera);

        // Capture frame as JPEG
        const imageData = canvas.toDataURL("image/jpeg", 0.92);

        // Send to API
        setStatus(`Saving frame ${i + 1}/${FRAME_COUNT}...`);
        try {
          const res = await fetch("/api/save-frame", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ frameIndex: i + 1, imageData }),
          });
          const result = await res.json();
          if (!result.success) {
            setStatus(`Error saving frame ${i + 1}: ${result.error}`);
            return;
          }
        } catch (err) {
          setStatus(`Network error saving frame ${i + 1}: ${err}`);
          return;
        }

        setProgress(Math.round(((i + 1) / FRAME_COUNT) * 100));
      }

      // Cleanup
      renderer.dispose();
      setStatus("All 50 frames rendered and saved successfully!");
      setDone(true);
    }

    renderAllFrames();
  }, []);

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        🏎️ Car Frame Renderer
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#aaa", marginBottom: "2rem" }}>
        {status}
      </p>

      <div
        style={{
          width: "400px",
          height: "8px",
          background: "#222",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: done ? "#22c55e" : "#ef4444",
            transition: "width 0.2s",
            borderRadius: "4px",
          }}
        />
      </div>
      <p style={{ color: "#666" }}>{progress}%</p>

      {done && (
        <p
          style={{
            marginTop: "2rem",
            color: "#22c55e",
            fontSize: "1.1rem",
          }}
        >
          ✅ Done! All frames saved to public/images/sequence/. You can close
          this page.
        </p>
      )}

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          marginTop: "2rem",
          maxWidth: "90vw",
          border: "1px solid #333",
          borderRadius: "8px",
        }}
      />
    </div>
  );
}
