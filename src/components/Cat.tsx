import React from "react";

const Cat = (props: any) => {
  return (
    <group {...props}>
      {/* Cat body */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.25, 0.18, 0.4]} />
        <meshStandardMaterial color="#5d5d5d" roughness={1} metalness={0} />
      </mesh>

      {/* Cat head */}
      <mesh position={[0, 0.26, 0.16]}>
        <boxGeometry args={[0.18, 0.15, 0.15]} />
        <meshStandardMaterial color="#5d5d5d" roughness={1} metalness={0} />
      </mesh>

      {/* Cat ears */}
      <mesh position={[-0.06, 0.34, 0.16]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.06, 0.08, 0.03]} />
        <meshStandardMaterial color="#5d5d5d" roughness={1} metalness={0} />
      </mesh>
      <mesh position={[0.06, 0.34, 0.16]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.06, 0.08, 0.03]} />
        <meshStandardMaterial color="#5d5d5d" roughness={1} metalness={0} />
      </mesh>

      {/* Cat tail */}
      <mesh position={[0, 0.15, -0.25]} rotation={[Math.PI / 3, 0, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.2]} />
        <meshStandardMaterial color="#5d5d5d" roughness={1} metalness={0} />
      </mesh>

      {/* Cat eyes */}
      <mesh position={[-0.05, 0.28, 0.24]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#ff9d00"
          emissive="#ff9d00"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.05, 0.28, 0.24]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#ff9d00"
          emissive="#ff9d00"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

export default Cat;
