import React from "react";
import * as THREE from "three";

interface ShelfProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: number;
}

const Shelf: React.FC<ShelfProps> = ({ 
  position, 
  rotation = [0, 0, 0], 
  size = 1 
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* SHELF STRUCTURE */}
      {/* Main shelf board */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.0 * size, 0.05 * size, 0.25 * size]} />
        <meshStandardMaterial color="#d5afa7" roughness={1} metalness={0} />
      </mesh>
      
      {/* Shelf brackets */}
      <mesh position={[-0.35 * size, -0.08 * size, 0]}>
        <boxGeometry args={[0.08 * size, 0.15 * size, 0.2 * size]} />
        <meshStandardMaterial color="#d5afa7" roughness={1} metalness={0} />
      </mesh>
      <mesh position={[0.35 * size, -0.08 * size, 0]}>
        <boxGeometry args={[0.08 * size, 0.15 * size, 0.2 * size]} />
        <meshStandardMaterial color="#d5afa7" roughness={1} metalness={0} />
      </mesh>

      {/* BOOKS ON SHELF */}
      {/* Book 1 - Standing */}
      <mesh position={[-0.25 * size, 0.07 * size, -0.05 * size]}>
        <boxGeometry args={[0.08 * size, 0.12 * size, 0.03 * size]} />
        <meshStandardMaterial color="#8B4513" roughness={1} metalness={0} />
      </mesh>
      
      {/* Book 2 - Standing */}
      <mesh position={[-0.15 * size, 0.07 * size, -0.05 * size]}>
        <boxGeometry args={[0.08 * size, 0.15 * size, 0.03 * size]} />
        <meshStandardMaterial color="#2F4F4F" roughness={1} metalness={0} />
      </mesh>
      
      {/* Book 3 - Standing */}
      <mesh position={[-0.05 * size, 0.07 * size, -0.05 * size]}>
        <boxGeometry args={[0.08 * size, 0.13 * size, 0.03 * size]} />
        <meshStandardMaterial color="#800080" roughness={1} metalness={0} />
      </mesh>
      
      {/* Book 4 - Lying flat */}
      <mesh position={[0.1 * size, 0.045 * size, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.08 * size, 0.12 * size, 0.03 * size]} />
        <meshStandardMaterial color="#FF6347" roughness={1} metalness={0} />
      </mesh>
      
      {/* Book 5 - On top of lying book */}
      <mesh position={[0.1 * size, 0.07 * size, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.06 * size, 0.1 * size, 0.025 * size]} />
        <meshStandardMaterial color="#4B0082" roughness={1} metalness={0} />
      </mesh>

      {/* DECORATIONS ON SHELF */}
      {/* Small picture frame */}
      <mesh position={[0.25 * size, 0.06 * size, -0.05 * size]}>
        <boxGeometry args={[0.08 * size, 0.1 * size, 0.01 * size]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Picture in frame */}
      <mesh position={[0.25 * size, 0.06 * size, -0.055 * size]}>
        <boxGeometry args={[0.06 * size, 0.08 * size, 0.005 * size]} />
        <meshStandardMaterial color="#87CEEB" roughness={1} metalness={0} />
      </mesh>

      {/* Small succulent plant */}
      <mesh position={[0.35 * size, -0.07 * size, 0]}>
        <cylinderGeometry args={[0.025 * size, 0.025 * size, 0.04 * size, 8]} />
        <meshStandardMaterial color="#CD853F" roughness={1} metalness={0} />
      </mesh>
      <mesh position={[0.35 * size, -0.03 * size, 0]}>
        <sphereGeometry args={[0.03 * size, 8, 8]} />
        <meshStandardMaterial color="#228B22" roughness={1} metalness={0} />
      </mesh>

      {/* LIGHT CHAIN */}
      {/* Create a series of small lights hanging under the shelf */}
      {Array.from({ length: 8 }, (_, i) => {
        const x = -0.35 * size + (i * 0.1 * size);
        const y = -0.05 * size - Math.sin(i * 0.8) * 0.03 * size; // Slight curve
        const z = -0.05 * size;
        return (
          <group key={`light-${i}`} position={[x, y, z]}>
            {/* Light bulb */}
            <mesh>
              <sphereGeometry args={[0.015 * size, 8, 8]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF6B6B" : "#4ECDC4"}
                emissive={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF6B6B" : "#4ECDC4"}
                emissiveIntensity={0.6}
                transparent
                opacity={0.9}
              />
            </mesh>
            
            {/* Small light glow */}
            <pointLight
              color={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF6B6B" : "#4ECDC4"}
              intensity={0.2 * size}
              distance={0.5 * size}
              decay={2}
            />
            
            {/* Wire connection */}
            {i < 7 && (
              <mesh position={[0.05 * size, 0.01 * size, 0]} rotation={[0, 0, Math.atan2(-0.02 * size, 0.1 * size)]}>
                <cylinderGeometry args={[0.002 * size, 0.002 * size, 0.1 * size, 4]} />
                <meshStandardMaterial color="#333333" roughness={1} metalness={0} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Main wire for the light chain */}
      <mesh position={[0, -0.02 * size, -0.05 * size]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.003 * size, 0.003 * size, 0.8 * size, 6]} />
        <meshStandardMaterial color="#333333" roughness={1} metalness={0} />
      </mesh>

      {/* Wire connection to shelf */}
      <mesh position={[-0.4 * size, -0.02 * size, -0.05 * size]}>
        <cylinderGeometry args={[0.002 * size, 0.002 * size, 0.05 * size, 4]} />
        <meshStandardMaterial color="#333333" roughness={1} metalness={0} />
      </mesh>
      <mesh position={[0.4 * size, -0.02 * size, -0.05 * size]}>
        <cylinderGeometry args={[0.002 * size, 0.002 * size, 0.05 * size, 4]} />
        <meshStandardMaterial color="#333333" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
};

export default Shelf;