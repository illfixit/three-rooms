import React from "react";

interface ChairProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

const Chair: React.FC<ChairProps> = ({ position, rotation = [0, 0, 0] }) => {
  const seatColor = "#f5f5f5"; // Light gray/white seat

  return (
    <group position={position} rotation={rotation}>
      {/* Office chair seat - ergonomic shape */}
      <mesh position={[0, 0.45, 0]} receiveShadow>
        <cylinderGeometry args={[0.22, 0.2, 0.08, 32]} />
        <meshStandardMaterial
          color={seatColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Ergonomic backrest */}
      <mesh position={[0, 0.7, -0.15]} receiveShadow>
        <boxGeometry args={[0.35, 0.4, 0.06]} />
        <meshStandardMaterial
          color={seatColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Central gas cylinder (pneumatic) */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.02, 0.5, 16]} />
        <meshStandardMaterial
          color={seatColor}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.03, 32]} />
        <meshStandardMaterial
          color={seatColor}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default Chair;
