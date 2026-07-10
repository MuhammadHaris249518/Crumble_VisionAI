/**
 * HeroScene.jsx — Three.js 3D animated background for CrumbleVision AI.
 *
 * Renders two layers:
 *   1. A wave-grid plane (animated sine-wave displacement) in indigo
 *   2. 80 floating "crumb" spheres with random sizes, warm amber/white colours,
 *      and gentle orbit + bob animation
 *
 * Designed to sit behind the Header as a full-bleed decorative layer.
 * Pointer-events are disabled so it never intercepts clicks.
 */
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

/* ── Wave grid ── */
function WaveGrid() {
  const meshRef = useRef();
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(28, 12, 60, 24);
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave = Math.sin(x * 0.4 + t * 0.8) * 0.22 +
                   Math.sin(y * 0.6 + t * 0.5) * 0.18;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geom} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -1.6, -3]}>
      <meshStandardMaterial
        color="#6366F1"
        wireframe
        transparent
        opacity={0.13}
      />
    </mesh>
  );
}

/* ── Individual crumb sphere ── */
function Crumb({ position, scale, color, speed, floatIntensity }) {
  return (
    <Float
      speed={speed}
      floatIntensity={floatIntensity}
      rotationIntensity={0.8}
    >
      <Sphere args={[scale, 8, 8]} position={position}>
        <MeshWobbleMaterial
          color={color}
          factor={0.18}
          speed={1.2}
          transparent
          opacity={0.75}
          roughness={0.35}
          metalness={0.2}
        />
      </Sphere>
    </Float>
  );
}

/* ── Generate crumb props once ── */
function useCrumbs(count = 80) {
  return useMemo(() => {
    const palette = [
      "#FCD34D", "#F59E0B", "#D97706",  // amber/gold
      "#A78BFA", "#818CF8", "#6366F1",  // indigo
      "#E2E8F0", "#CBD5E1",              // light grey/white
      "#FDE68A", "#FCA5A5",              // soft yellow/pink
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 10 - 2,
      ],
      scale: 0.04 + Math.random() * 0.22,
      color: palette[Math.floor(Math.random() * palette.length)],
      speed: 0.6 + Math.random() * 1.4,
      floatIntensity: 0.4 + Math.random() * 1.2,
    }));
  }, [count]);
}

/* ── Main scene inside Canvas ── */
function Scene() {
  const crumbs = useCrumbs(80);
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-8, 4, -4]} intensity={0.8} color="#818CF8" />
      <pointLight position={[8, -4, 2]}  intensity={0.5} color="#F59E0B" />

      <WaveGrid />

      {crumbs.map((c) => (
        <Crumb key={c.id} {...c} />
      ))}
    </>
  );
}

/* ── Exported component ── */
export default function HeroScene({ height = 220 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        height,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 10], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
