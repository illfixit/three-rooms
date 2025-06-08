import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FireplaceProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
}

const Fireplace: React.FC<FireplaceProps> = ({ 
  position, 
  rotation = [0, 0, 0], 
  size = 1 
}) => {
  const flameGroup = useRef<THREE.Group>(null!);
  const sparkGroup = useRef<THREE.Group>(null!);
  const fireLight = useRef<THREE.PointLight>(null!);

  // Create multiple flame particles
  const flamePositions = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      x: (Math.random() - 0.5) * 0.3 * size,
      y: Math.random() * 0.2 * size,
      z: (Math.random() - 0.5) * 0.3 * size,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5,
    }))
  );

  // Create spark particles
  const sparkPositions = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      x: (Math.random() - 0.5) * 0.2 * size,
      y: Math.random() * 0.4 * size,
      z: (Math.random() - 0.5) * 0.2 * size,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.7,
    }))
  );

  useFrame((state) => {
    if (!flameGroup.current || !sparkGroup.current || !fireLight.current) return;

    const time = state.clock.elapsedTime;

    // Animate flames
    flameGroup.current.children.forEach((flame, i) => {
      const pos = flamePositions.current[i];
      if (pos) {
        const flicker = Math.sin(time * pos.speed + pos.phase) * 0.1;
        const rise = Math.sin(time * 0.8) * 0.05;
        
        flame.position.x = pos.x + flicker;
        flame.position.y = pos.y + rise + Math.abs(Math.sin(time * 2 + pos.phase)) * 0.15;
        flame.position.z = pos.z + flicker * 0.5;
        
        flame.scale.setScalar(0.8 + Math.sin(time * 3 + pos.phase) * 0.3);
      }
    });

    // Animate sparks
    sparkGroup.current.children.forEach((spark, i) => {
      const pos = sparkPositions.current[i];
      if (pos) {
        const rise = Math.sin(time * pos.speed + pos.phase) * 0.1;
        
        spark.position.x = pos.x + Math.sin(time + pos.phase) * 0.05;
        spark.position.y = pos.y + rise + Math.abs(Math.cos(time * 1.5 + pos.phase)) * 0.2;
        spark.position.z = pos.z + Math.cos(time + pos.phase) * 0.05;
      }
    });

    // Animate fire light
    const lightFlicker = 0.8 + Math.sin(time * 4) * 0.3 + Math.sin(time * 7) * 0.2;
    fireLight.current.intensity = lightFlicker * size;
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Main fireplace body - consistent stone/brick texture */}
      {/* Base foundation */}
      <mesh position={[0, 0.02 * size, 0]}>
        <boxGeometry args={[1.0 * size, 0.04 * size, 0.8 * size]} />
        <meshStandardMaterial color="#8B7355" roughness={1} metalness={0} />
      </mesh>
      
      {/* Hearth/floor */}
      <mesh position={[0, 0.06 * size, 0]}>
        <boxGeometry args={[0.9 * size, 0.04 * size, 0.7 * size]} />
        <meshStandardMaterial color="#A0522D" roughness={1} metalness={0} />
      </mesh>
      
      {/* Back wall */}
      <mesh position={[0, 0.45 * size, -0.3 * size]}>
        <boxGeometry args={[0.8 * size, 0.8 * size, 0.1 * size]} />
        <meshStandardMaterial color="#8B4513" roughness={1} metalness={0} />
      </mesh>
      
      {/* Side walls */}
      <mesh position={[-0.35 * size, 0.45 * size, 0]}>
        <boxGeometry args={[0.1 * size, 0.8 * size, 0.6 * size]} />
        <meshStandardMaterial color="#8B4513" roughness={1} metalness={0} />
      </mesh>
      <mesh position={[0.35 * size, 0.45 * size, 0]}>
        <boxGeometry args={[0.1 * size, 0.8 * size, 0.6 * size]} />
        <meshStandardMaterial color="#8B4513" roughness={1} metalness={0} />
      </mesh>
      
      {/* Top of firebox */}
      <mesh position={[0, 0.85 * size, 0]}>
        <boxGeometry args={[0.8 * size, 0.1 * size, 0.6 * size]} />
        <meshStandardMaterial color="#8B4513" roughness={1} metalness={0} />
      </mesh>
      
      {/* Decorative mantel */}
      <mesh position={[0, 0.92 * size, -0.05 * size]}>
        <boxGeometry args={[1.1 * size, 0.12 * size, 0.5 * size]} />
        <meshStandardMaterial color="#A0522D" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Mantel supports */}
      <mesh position={[-0.4 * size, 0.75 * size, 0.2 * size]}>
        <boxGeometry args={[0.08 * size, 0.3 * size, 0.08 * size]} />
        <meshStandardMaterial color="#A0522D" roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh position={[0.4 * size, 0.75 * size, 0.2 * size]}>
        <boxGeometry args={[0.08 * size, 0.3 * size, 0.08 * size]} />
        <meshStandardMaterial color="#A0522D" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Glass front door */}
      <mesh position={[0, 0.45 * size, 0.35 * size]}>
        <boxGeometry args={[0.7 * size, 0.7 * size, 0.02 * size]} />
        <meshStandardMaterial 
          color="#b3e6ff" 
          roughness={0.1} 
          metalness={0.1} 
          transparent 
          opacity={0.3} 
        />
      </mesh>
      
      {/* Glass door frame */}
      <group position={[0, 0.45 * size, 0.36 * size]}>
        {/* Frame border */}
        <mesh position={[0, 0.36 * size, 0]}>
          <boxGeometry args={[0.72 * size, 0.02 * size, 0.02 * size]} />
          <meshStandardMaterial color="#2F2F2F" roughness={0.5} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.36 * size, 0]}>
          <boxGeometry args={[0.72 * size, 0.02 * size, 0.02 * size]} />
          <meshStandardMaterial color="#2F2F2F" roughness={0.5} metalness={0.8} />
        </mesh>
        <mesh position={[-0.36 * size, 0, 0]}>
          <boxGeometry args={[0.02 * size, 0.72 * size, 0.02 * size]} />
          <meshStandardMaterial color="#2F2F2F" roughness={0.5} metalness={0.8} />
        </mesh>
        <mesh position={[0.36 * size, 0, 0]}>
          <boxGeometry args={[0.02 * size, 0.72 * size, 0.02 * size]} />
          <meshStandardMaterial color="#2F2F2F" roughness={0.5} metalness={0.8} />
        </mesh>
        {/* Cross divider */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.72 * size, 0.015 * size, 0.02 * size]} />
          <meshStandardMaterial color="#2F2F2F" roughness={0.5} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.015 * size, 0.72 * size, 0.02 * size]} />
          <meshStandardMaterial color="#2F2F2F" roughness={0.5} metalness={0.8} />
        </mesh>
      </group>

      {/* Chimney tube */}
      <mesh position={[0, 1.3 * size, -0.15 * size]}>
        <cylinderGeometry args={[0.15 * size, 0.18 * size, 0.6 * size, 8]} />
        <meshStandardMaterial color="#654321" roughness={1} metalness={0} />
      </mesh>
      
      {/* Chimney cap */}
      <mesh position={[0, 1.65 * size, -0.15 * size]}>
        <cylinderGeometry args={[0.22 * size, 0.2 * size, 0.08 * size, 8]} />
        <meshStandardMaterial color="#2F2F2F" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Logs inside the fireplace */}
      <group position={[0, 0.1 * size, 0.1 * size]}>
        <mesh position={[-0.1 * size, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
          <cylinderGeometry args={[0.03 * size, 0.04 * size, 0.4 * size, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={1} metalness={0} />
        </mesh>
        <mesh position={[0.1 * size, 0.03 * size, -0.05 * size]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.025 * size, 0.035 * size, 0.35 * size, 8]} />
          <meshStandardMaterial color="#654321" roughness={1} metalness={0} />
        </mesh>
        <mesh position={[0, 0.06 * size, 0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0.02 * size, 0.03 * size, 0.3 * size, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={1} metalness={0} />
        </mesh>
      </group>

      {/* Animated flames */}
      <group ref={flameGroup} position={[0, 0.2 * size, 0.1 * size]}>
        {flamePositions.current.map((_, i) => (
          <mesh key={`flame-${i}`}>
            <coneGeometry args={[0.05 * size, 0.15 * size, 6]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#FF4500" : "#FF6B35"}
              emissive={i % 2 === 0 ? "#FF4500" : "#FF6B35"}
              emissiveIntensity={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* Animated sparks */}
      <group ref={sparkGroup} position={[0, 0.25 * size, 0.1 * size]}>
        {sparkPositions.current.map((_, i) => (
          <mesh key={`spark-${i}`}>
            <sphereGeometry args={[0.01 * size, 4, 4]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Fire light */}
      <pointLight
        ref={fireLight}
        position={[0, 0.3 * size, 0.2 * size]}
        color="#FF6B35"
        intensity={2 * size}
        distance={3 * size}
        decay={2}
        castShadow
      />

      {/* Ambient warm glow */}
      <pointLight
        position={[0, 0.2 * size, 0.15 * size]}
        color="#FF8C42"
        intensity={0.5 * size}
        distance={2 * size}
        decay={1.5}
      />
    </group>
  );
};

export default Fireplace;