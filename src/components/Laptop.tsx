import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LaptopProps {
  position: [number, number, number];
}

const Laptop: React.FC<LaptopProps> = ({ position }) => {
  const screenLightRef = useRef<THREE.PointLight>(null!);
  const displayRef = useRef<THREE.Mesh>(null!);
  const keyboardRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (screenLightRef.current && displayRef.current) {
      // Create a gentle shimmer effect that cycles every 2 seconds
      const time = state.clock.elapsedTime;
      const shimmer = Math.abs(Math.sin((time / 2) * Math.PI)) / 2;

      // Adjust light intensity with shimmer
      screenLightRef.current.intensity = shimmer;

      // Adjust emissive intensity of the screen
      if (displayRef.current.material instanceof THREE.MeshStandardMaterial) {
        displayRef.current.material.emissiveIntensity = 0.4 + shimmer * 0.4;
      }
    }
  });

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Laptop base/bottom */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[0.4, 0.025, 0.3]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Keyboard area */}
      <mesh ref={keyboardRef} position={[0, 0.013, 0.02]} receiveShadow>
        <boxGeometry args={[0.35, 0.002, 0.25]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.015, 0.08]} receiveShadow>
        <boxGeometry args={[0.08, 0.001, 0.06]} />
        <meshStandardMaterial color="#333" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Screen back */}
      <mesh position={[-0.01, 0.11, -0.15]} rotation={[-Math.PI / 8, 0, 0]}>
        <boxGeometry args={[0.38, 0.24, 0.015]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Display screen (emissive) */}
      <mesh
        ref={displayRef}
        position={[-0.01, 0.12, -0.14]}
        rotation={[-Math.PI / 8, 0, 0]}
      >
        <boxGeometry args={[0.32, 0.18, 0.001]} />
        <meshStandardMaterial
          color="#4a90e2"
          emissive="#4a90e2"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.0}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* Screen light source */}
      <pointLight
        ref={screenLightRef}
        position={[0, 0.12, -0.13]}
        color="#4a90e2"
        intensity={1}
        distance={2}
        decay={1.5}
      />

      {/* Additional subtle screen glow */}
      <pointLight
        position={[0, 0.08, -0.1]}
        color="#6bb6ff"
        intensity={0.3}
        distance={1}
        decay={2}
      />
    </group>
  );
};

export default Laptop;
