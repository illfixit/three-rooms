import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Cat from "./Cat";
import Laptop from "./Laptop";
import Chair from "./Chair";

// COLORS
const wallColor = "#c87e77";
const floorColor = "#956a69";
const wood = "#d5afa7";
const pillow = "#ffe8d1";
const blanket = "#a65a5a";
const deskColor = "#a9865b";
const lampShade = "#ffe285";
const plantPot = "#b94e48";
const plantLeaf = "#6e986c";
const rugColor1 = "#dadfe1";
const rugColor2 = "#b0b2ba";
const mugColor = "#fff";

const SIZE = 4;
const NUM_RAINDROPS = 20;
const RAIN_SPEED_Y = 0.083;
const RAIN_SPEED_X = 0.025;
const RAIN_SPEED_Z = 0.0;

// Utility for random values
const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// Improved Rain: only behind the window, 1.5x larger than window
const Rain: React.FC = () => {
  const group = useRef<THREE.Group>(null!);

  // Window size and position - 2x smaller width, 1.3x taller height, 10% higher
  const windowWidth = ((SIZE - 1.4) * 1.25) / 2; // Made 2x smaller
  const windowHeight = ((SIZE - 1.4) * 1.25 * 1.3) / 2; // Made 1.3x taller
  const windowCenterY = SIZE / 2 + SIZE * 0.1; // Moved 10% higher
  const windowZ = -SIZE / 2 + 0.01; // just behind the window

  // Generate initial positions within the rain area behind the window
  const positions = useRef<[number, number, number][]>(
    Array.from({ length: NUM_RAINDROPS }, () => {
      const x = randomBetween(-windowWidth / 2, windowWidth / 2);
      const y = randomBetween(
        windowCenterY - windowHeight / 2,
        windowCenterY + windowHeight / 2
      );
      const z = windowZ - 0.1; // slightly behind the window
      return [x, y, z];
    })
  );

  useFrame(() => {
    if (!group.current) return;

    positions.current.forEach((pos) => {
      pos[0] -= RAIN_SPEED_X;
      pos[1] -= RAIN_SPEED_Y;

      // Reset if fallen below window area
      if (pos[1] < windowCenterY - windowHeight / 2) {
        pos[0] = randomBetween(-windowWidth / 2, windowWidth / 2);
        pos[1] = windowCenterY + windowHeight / 2;
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
          <cylinderGeometry
            args={[
              randomBetween(0.012, 0.02),
              0.014,
              randomBetween(0.2, 0.4),
              4,
            ]}
          />
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

    {/* Left Wall - Complete wall with window opening */}
    {/* Bottom wall segment (below window) */}
    <mesh
      position={[
        0,
        (SIZE / 2 + SIZE * 0.1 - ((SIZE - 1.4) / 4) * 1.3) / 2,
        -SIZE / 2,
      ]}
      receiveShadow
    >
      <boxGeometry
        args={[SIZE, SIZE / 2 + SIZE * 0.1 - ((SIZE - 1.4) / 4) * 1.3, 0.1]}
      />
      <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
    </mesh>

    {/* Top wall segment (above window) */}
    <mesh
      position={[
        0,
        (SIZE + SIZE / 2 + SIZE * 0.1 + ((SIZE - 1.4) / 4) * 1.3) / 2,
        -SIZE / 2,
      ]}
      receiveShadow
    >
      <boxGeometry
        args={[
          SIZE,
          SIZE - (SIZE / 2 + SIZE * 0.1 + ((SIZE - 1.4) / 4) * 1.3),
          0.1,
        ]}
      />
      <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
    </mesh>

    {/* Left wall segment (beside window) */}
    <mesh
      position={[
        -(SIZE / 2 + (SIZE - 1.4) / 4) / 2,
        SIZE / 2 + SIZE * 0.1,
        -SIZE / 2,
      ]}
      receiveShadow
    >
      <boxGeometry
        args={[SIZE / 2 - (SIZE - 1.4) / 4, ((SIZE - 1.4) / 2) * 1.3, 0.1]}
      />
      <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
    </mesh>

    {/* Right wall segment (beside window) */}
    <mesh
      position={[
        (SIZE / 2 + (SIZE - 1.4) / 4) / 2,
        SIZE / 2 + SIZE * 0.1,
        -SIZE / 2,
      ]}
      receiveShadow
    >
      <boxGeometry
        args={[SIZE / 2 - (SIZE - 1.4) / 4, ((SIZE - 1.4) / 2) * 1.3, 0.1]}
      />
      <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
    </mesh>

    {/* Window - SMALLER width, 1.3x taller height, 10% higher */}
    <mesh position={[0, SIZE / 2 + SIZE * 0.1, -SIZE / 2 - 0.05]}>
      <boxGeometry args={[(SIZE - 1.4) / 2, ((SIZE - 1.4) / 2) * 1.3, 0.01]} />
      <meshStandardMaterial
        color="#b3bbe0"
        opacity={0.3}
        transparent
        depthWrite={false}
      />
    </mesh>

    {/* Window frame - 1.3x taller, 10% higher */}
    {/* Upper horizontal frame */}
    <mesh
      position={[
        0,
        SIZE / 2 + SIZE * 0.1 + ((SIZE - 1.4) / 4) * 1.3,
        -SIZE / 2 + 0.05,
      ]}
    >
      <boxGeometry args={[(SIZE - 1.2) / 2, 0.12, 0.15]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>

    {/* Lower horizontal frame */}
    <mesh
      position={[
        0,
        SIZE / 2 + SIZE * 0.1 - ((SIZE - 1.4) / 4) * 1.3,
        -SIZE / 2 + 0.05,
      ]}
    >
      <boxGeometry args={[(SIZE - 1.2) / 2, 0.12, 0.3]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>

    {/* Left vertical frame */}
    <mesh
      position={[-(SIZE - 1.4) / 4, SIZE / 2 + SIZE * 0.1, -SIZE / 2 + 0.05]}
    >
      <boxGeometry args={[0.12, ((SIZE - 1.4) / 2) * 1.3, 0.15]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>

    {/* Right vertical frame */}
    <mesh
      position={[(SIZE - 1.4) / 4, SIZE / 2 + SIZE * 0.1, -SIZE / 2 + 0.05]}
    >
      <boxGeometry args={[0.12, ((SIZE - 1.4) / 2) * 1.3, 0.15]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>

    {/* Window frame dividers - horizontal */}
    <mesh position={[0, SIZE / 2 + SIZE * 0.1, -SIZE / 2 + 0.07]}>
      <boxGeometry args={[(SIZE - 1.4) / 2, 0.05, 0.05]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>

    {/* Window frame dividers - vertical */}
    <mesh position={[0, SIZE / 2 + SIZE * 0.1, -SIZE / 2 + 0.07]}>
      <boxGeometry args={[0.05, ((SIZE - 1.4) / 2) * 1.3, 0.05]} />
      <meshStandardMaterial color="#e0e0e0" roughness={1} metalness={0} />
    </mesh>

    {/* Right Wall */}
    <mesh
      position={[-SIZE / 2, SIZE / 2, 0]}
      rotation={[0, Math.PI / 2, 0]}
      receiveShadow
    >
      <boxGeometry args={[SIZE, SIZE, 0.1]} />
      <meshStandardMaterial color={"#d67e77"} roughness={1} metalness={0} />
    </mesh>

    {/* RUG */}
    {[...Array(6)].map((_, x) =>
      [...Array(6)].map((_, z) => (
        <mesh
          key={`rug-${x}-${z}`}
          position={[-1 + x * 0.45, 0.055, -1 + z * 0.45]}
        >
          <boxGeometry args={[0.44, 0.01, 0.44]} />
          <meshStandardMaterial
            color={(x + z) % 2 === 0 ? rugColor1 : rugColor2}
            roughness={1}
            metalness={0}
          />
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
      <meshStandardMaterial color={"white"} roughness={1} metalness={0} />
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
      [-1.2, 0.4, -0.25],
    ].map(([x, y, z], i) => (
      <mesh key={`desk-leg-${i}`} position={[x, y, z]}>
        <boxGeometry args={[0.08, 0.8, 0.08]} />
        <meshStandardMaterial color={deskColor} roughness={1} metalness={0} />
      </mesh>
    ))}

    {/* Office Chair */}
    <Chair position={[-0.8, 0, 0.8]} rotation={[0, Math.PI * 1.5, 0]} />

    {/* Laptop with animated display */}
    <Laptop position={[-1.55, 0.86, 1]} />

    {/* Mug */}
    <mesh position={[-1.72, 1, 0.65]}>
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
    {/* CAT */}
    <Cat position={[1.15, 0.6, 0.65]} />
  </>
);

export default Room;
