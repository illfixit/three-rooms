import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// COLORS
const wallColor = "#c87e77";
const floorColor = "#955a49";
const wood = "#653f37";
const bedsheet = "#d9b3aa";
const pillow = "#ffe8d1";
const blanket = "#a65a5a";
const deskColor = "#a9865b";
const laptop = "#666";
const lampShade = "#ffe285";
const plantPot = "#b94e48";
const plantLeaf = "#6e986c";
const rugColor1 = "#dadfe1";
const rugColor2 = "#b0b2ba";
const mugColor = "#fff";

const SIZE = 4;
const NUM_RAINDROPS = 60;
const RAIN_SPEED_Y = 0.083;
const RAIN_SPEED_X = 0.025;
const RAIN_SPEED_Z = 0.0;

// Utility for random values
const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

// Improved Rain: only behind the window, 1.5x larger than window
const Rain: React.FC = () => {
  const group = useRef<THREE.Group>(null!);

  // Window size and position (from your window frame code)
  const windowWidth = (SIZE - 1.4) * 1.25;
  const windowHeight = (SIZE - 1.4) * 1.25;
  const windowCenterY = SIZE / 2;
  const windowZ = -SIZE / 2 + 0.01; // just behind the window

  // Generate initial positions within the rain area behind the window
  const positions = useRef<[number, number, number][]>(
    Array.from({ length: NUM_RAINDROPS }, () => {
      const x = randomBetween(-windowWidth / 2, windowWidth / 2);
      const y = randomBetween(windowCenterY - windowHeight / 2, windowCenterY + windowHeight / 2);
      const z = windowZ - 0.1; // slightly behind the window
      return [x, y, z];
    })
  );

  useFrame(() => {
    if (!group.current) return;

    positions.current.forEach((pos) => {
      pos[0] -= RAIN_SPEED_X;
      pos[1] -= RAIN_SPEED_Y;
      // pos[2] -= RAIN_SPEED_Z; // not needed, rain is flat behind window

      // Reset if fallen below window area
      if (pos[1] < windowCenterY - windowHeight / 2) {
        pos[0] = randomBetween(-windowWidth / 2, windowWidth / 2);
        pos[1] = windowCenterY + windowHeight / 2;
        // pos[2] = windowZ - 0.1;
      }
    });

    group.current.children.forEach((mesh, i) => {
      const currentPos = positions.current[i];
      if (currentPos) {
        mesh.position.set(...(currentPos as [number, number, number]));
        mesh.rotation.x = Math.atan2(RAIN_SPEED_Z, RAIN_SPEED_Y);
        mesh.rotation.z = -Math.atan2(RAIN_SPEED_X, RAIN_SPEED_Y);
        mesh.rotation.y = 0;
      }
    });
  });

  return (
    <group ref={group}>
      {positions.current.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[randomBetween(0.012, 0.02), 0.014, randomBetween(0.2, 0.4), 4]} />
          <meshStandardMaterial color="#a0c8e0" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const Room: React.FC = () => (
  <>
    {/* Animated Rain */}
    <Rain />
{/* TABLE LAMP */}
{/* Base */}
<mesh position={[-1.65, 1, 1.7]}>
  <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
  <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.7} />
</mesh>

{/* Pole */}
<mesh position={[-1.65, 1.1, 1.7]}>
  <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
  <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.7} />
</mesh>

{/* Shade */}
<mesh position={[-1.65, 1.2, 1.7]}>
  <coneGeometry args={[0.1, 0.12, 16, 1, true]} />
  <meshStandardMaterial 
    color={lampShade} 
    side={THREE.DoubleSide}
    emissive="#ffe285" 
    emissiveIntensity={0.2}
  />
</mesh>

{/* Light Bulb */}
<mesh position={[-1.65, 1.2, 1.7]}>
  <sphereGeometry args={[0.02, 8, 8]} />
  <meshStandardMaterial 
    color="#fff8dc"
    emissive="#fff8dc"
    emissiveIntensity={1.0}
  />
</mesh>

{/* Point Light */}
<pointLight
  position={[-1.65, 1.3, 1.7]}
  color="#ffe285"
  intensity={0.8}
  distance={3}
  decay={2}
  castShadow
/>


    {/* Floor */}
    <mesh position={[0, 0, 0]} receiveShadow>
      <boxGeometry args={[SIZE, 0.1, SIZE]} />
      <meshStandardMaterial color={floorColor} roughness={1} metalness={0} />
    </mesh>
    
    {/* Left Wall - Now just the FRAME parts around a large window */}
    {/* Top part of the frame */}
    <mesh position={[0, SIZE - 0.35, -SIZE / 2]} receiveShadow>
      <boxGeometry args={[SIZE, 0.7, 0.1]} />
      <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
    </mesh>
    {/* Bottom part of the frame */}
    <mesh position={[0, 0.35, -SIZE / 2]}>
      <boxGeometry args={[SIZE, 0.7, 0.1]} />
      <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
    </mesh>
    {/* Left part of the frame */}
    <mesh position={[-SIZE/2 + 0.35, SIZE/2, -SIZE / 2]}>
      <boxGeometry args={[0.7, SIZE, 0.1]} />
      <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
    </mesh>
    {/* Right part of the frame */}
    <mesh position={[SIZE/2 - 0.35, SIZE/2, -SIZE / 2]}>
      <boxGeometry args={[0.7, SIZE, 0.1]} />
      <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
    </mesh>

    {/* Window - large rectangle */}
    {/* <mesh position={[0, SIZE / 2, -SIZE / 2 + 0.05]}>
      <planeGeometry args={[SIZE - 1.4, SIZE - 1.4]} />
      <meshStandardMaterial color="#b3cde0" transparent={true} opacity={10} />
    </mesh> */}
    
    {/* Window frame */}
    {/* Upper horizontal frame */}
    <mesh position={[0, SIZE-0.6, -SIZE / 2 + 0.05]}>
      <boxGeometry args={[SIZE - 1.2, 0.12, 0.15]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>

    {/* Lower horizontal frame */}
    <mesh position={[0, SIZE - 3.3, -SIZE / 2 + 0.05]}>
      <boxGeometry args={[SIZE - 1.2, 0.12, 0.3]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>
    
    {/* Cat on the lower window frame */}
    <group position={[-0.6, SIZE - 3.2, -SIZE / 2 + 0.2]}>
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
      <mesh position={[-0.06, 0.34, 0.16]} rotation={[0, 0, Math.PI/4]}>
        <boxGeometry args={[0.06, 0.08, 0.03]} />
        <meshStandardMaterial color="#5d5d5d" roughness={1} metalness={0} />
      </mesh>
      <mesh position={[0.06, 0.34, 0.16]} rotation={[0, 0, -Math.PI/4]}>
        <boxGeometry args={[0.06, 0.08, 0.03]} />
        <meshStandardMaterial color="#5d5d5d" roughness={1} metalness={0} />
      </mesh>
      
      {/* Cat tail */}
      <mesh position={[0, 0.15, -0.25]} rotation={[Math.PI/3, 0, 0]}>
        <boxGeometry args={[0.05, 0.05, 0.2]} />
        <meshStandardMaterial color="#5d5d5d" roughness={1} metalness={0} />
      </mesh>
      
      {/* Cat eyes */}
      <mesh position={[-0.05, 0.28, 0.24]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ff9d00" emissive="#ff9d00" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.05, 0.28, 0.24]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ff9d00" emissive="#ff9d00" emissiveIntensity={0.3} />
      </mesh>
    </group>

    {/* Left vertical frame */}
    <mesh position={[-SIZE / 2 + 0.7, SIZE - 2, -SIZE / 2 + 0.05]}>
      <boxGeometry args={[0.12, SIZE/2+0.7, 0.15]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>

    {/* Right vertical frame */}
    <mesh position={[SIZE / 2 - 0.7, SIZE - 2, -SIZE / 2 + 0.05]}>
      <boxGeometry args={[0.12, SIZE/2+0.7, 0.15]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>
    
    {/* Window frame dividers - horizontal */}
    <mesh position={[0, SIZE/2, -SIZE / 2 + 0.07]}>
      <boxGeometry args={[SIZE - 1.4, 0.05, 0.05]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>
    
    {/* Window frame dividers - vertical */}
    <mesh position={[0, SIZE/2, -SIZE / 2 + 0.07]}>
      <boxGeometry args={[0.05, SIZE - 1.4, 0.05]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>
    
    {/* Right Wall */}
    <mesh position={[-SIZE / 2, SIZE / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
      <boxGeometry args={[SIZE, SIZE, 0.1]} />
      <meshStandardMaterial color={'#d67e77'} roughness={1} metalness={0} />
    </mesh>

    {/* RUG */}
    {[...Array(6)].map((_, x) =>
      [...Array(6)].map((_, z) => (
        <mesh
          key={`rug-${x}-${z}`}
          position={[-1 + x * 0.45, 0.055, -1 + z * 0.45]}
        >
          <boxGeometry args={[0.44, 0.01, 0.44]} />
          <meshStandardMaterial color={(x + z) % 2 === 0 ? rugColor1 : rugColor2} roughness={1} metalness={0} />
        </mesh>
      ))
    )}

    {/* BED */}
    {/* Main part */}
    <mesh position={[1.3, 0.4, -0.4]}>
      <boxGeometry args={[1.25, 0.1, 3]} />
      <meshStandardMaterial color={wood} roughness={1} metalness={0} />
    </mesh>
    {/* Headboard (single piece, at the head of the bed) */}
    <mesh position={[1.3, 0.58, -1.8]}>
      <boxGeometry args={[1.25, 1.25, 0.12]} />
      <meshStandardMaterial color={wood} roughness={1} metalness={0} />
    </mesh>
    {/* Front left leg */}
    <mesh position={[0.72, 0.18, 0.98]}>
      <boxGeometry args={[0.16, 0.28, 0.16]} />
      <meshStandardMaterial color={wood} roughness={1} metalness={0} />
    </mesh>
    {/* Front right leg */}
    <mesh position={[1.8, 0.18, 0.98]}>
      <boxGeometry args={[0.16, 0.28, 0.16]} />
      <meshStandardMaterial color={wood} roughness={1} metalness={0} />
    </mesh>
        {/* Matress */}
        <mesh position={[1.3, 0.5, -0.36]}>
      <boxGeometry args={[1.1, 0.3, 2.8]} />
      <meshStandardMaterial color={'white'} roughness={1} metalness={0} />
    </mesh>
    {/* Pillow */}
    <mesh position={[1.3, 0.72, -1.4]}>
      <boxGeometry args={[0.6, 0.1, 0.4]} />
      <meshStandardMaterial color={pillow} roughness={1} metalness={0} />
    </mesh>
    {/* Blanket */}
    <mesh position={[1.3, 0.63, -0.04]}>
      <boxGeometry args={[1.16, 0.08, 2.15]} />
      <meshStandardMaterial color={blanket} roughness={1} metalness={0} />
    </mesh>

    {/* DESK */}
    <mesh 
      position={[-1.55, 0.8, 0.8]} // moved closer to the wall
      receiveShadow
    >
      <boxGeometry args={[0.9, 0.11, 2.2]} />
      <meshStandardMaterial color={deskColor} roughness={1} metalness={0} />
    </mesh>
    {/* Desk legs */}
    {/* Four legs at the corners of the desk */}
    {[
      [-1.85, 0.4, 1.85],
      [-1.2, 0.4, 1.85],
      [-1.85, 0.4, -0.25],
      [-1.2, 0.4, -0.25]
    ].map(([x, y, z], i) => (
      <mesh key={`desk-leg-${i}`} position={[x, y, z]}>
        <boxGeometry args={[0.08, 0.8, 0.08]} />
        <meshStandardMaterial color={deskColor} roughness={1} metalness={0} />
      </mesh>
    ))}

    {/* Laptop */}
    <mesh position={[-1.35, 1, 1]}>
      <boxGeometry args={[0.35, 0.03, 0.5]} />
      <meshStandardMaterial color={laptop} roughness={1} metalness={0} />
    </mesh>
    {/* Mug */}
    <mesh position={[-1.72, 1, 1]}>
      <cylinderGeometry args={[0.05, 0.05, 0.07, 14]} />
      <meshStandardMaterial color={mugColor} roughness={1} metalness={0} />
    </mesh>

    {/* Plant */}
    <mesh position={[-1.7, 1, 0.1]}>
      <cylinderGeometry args={[0.08, 0.08, 0.13, 16]} />
      <meshStandardMaterial color={plantPot} roughness={1} metalness={0} />
    </mesh>
    <mesh position={[-1.7, 1.15, 0.1]}>
      <sphereGeometry args={[0.12, 14, 14]} />
      <meshStandardMaterial color={plantLeaf} roughness={1} metalness={0} />
    </mesh>
  </>
);

export default Room;
