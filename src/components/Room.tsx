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
const NUM_RAINDROPS = 200; // Number of raindrops
const RAIN_SPEED_Y = 0.083; // Vertical speed
const RAIN_SPEED_X = 0.03; // Horizontal speed (for angle)
const RAIN_SPEED_Z = 0.0; // Depth speed (for angle)


const Rain: React.FC = () => {
  const group = useRef<THREE.Group>(null!);

  // Helper: returns true if point is inside the room bounds
  function isInsideRoom(x: number, y: number, z: number) {
    return (
      x > -SIZE*0.7 && // Check if left of wall
      z > -SIZE*0.7 // Check if in front of wall
    );
  }

  // Generate initial positions outside the room
  const positions = useRef<[number, number, number][]>(
    Array.from({ length: NUM_RAINDROPS }, () => {
      let x_init, y_init, z_init;
      do {
        // Wider spawn area to ensure rain comes from all directions outside
        x_init = (Math.random() - 1) * SIZE * 3;
        y_init = Math.random() * SIZE + SIZE; // Start above the room
        z_init = (Math.random() - 1) * SIZE * 3;
      } while (!isInsideRoom(x_init, y_init, z_init));
      return [x_init, y_init, z_init];
    })
  );

  useFrame(() => {
    if (!group.current) return;

    positions.current.forEach((pos) => {
      pos[0] -= RAIN_SPEED_X; // Move slightly on X for angle
      pos[1] -= RAIN_SPEED_Y; // Move down
      pos[2] -= RAIN_SPEED_Z; // Move slightly on Z for angle

      // Reset if fallen below a certain point or too far horizontally/depth-wise
      if (pos[1] < -SIZE*1.5 ) {
        let x_reset, y_reset, z_reset;
        do {
          x_reset = (Math.random() - 0.5) * SIZE * 3;
          y_reset = SIZE + Math.random() * SIZE; // Reset above the room
          z_reset = (Math.random() - 0.5) * SIZE * 3;
        } while (isInsideRoom(x_reset, y_reset, z_reset)); // Ensure it resets outside
        pos[0] = x_reset;
        pos[1] = y_reset;
        pos[2] = z_reset;
      }
    });

    group.current.children.forEach((mesh, i) => {
      const currentPos = positions.current[i];
      if (currentPos) {
        // Set visibility: if inside room, make invisible, otherwise visible
        if (isInsideRoom(currentPos[0], currentPos[1], currentPos[2])) {
          mesh.visible = false;
        } else {
          mesh.visible = true;
        }

        mesh.position.set(...(currentPos as [number, number, number]));
        
        // Align raindrops with their movement direction
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
          <cylinderGeometry args={[randomBetween(0.01, 0.02), 0.012, randomBetween(0.2, 0.6), 4]} /> {/* Thinner, slightly shorter raindrops */}
          <meshStandardMaterial color="#a0c8e0" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const randomBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

const Room: React.FC = () => (
  <>
    {/* Animated Rain */}
    <Rain />

    {/* Floor */}
    <mesh position={[0, 0, 0]} receiveShadow>
      <boxGeometry args={[SIZE, 0.1, SIZE]} />
      <meshStandardMaterial color={floorColor} roughness={1} metalness={0} />
    </mesh>
    
    {/* Left Wall - Now just the FRAME parts around a large window */}
    {/* Top part of the frame */}
    <mesh position={[0, SIZE - 0.35, -SIZE / 2]}>
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
    <mesh position={[-SIZE / 2, SIZE / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
      <boxGeometry args={[SIZE, SIZE, 0.1]} />
      <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
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
    <mesh position={[-1.1, 0.5, 1.15]}>
      <boxGeometry args={[1.1, 0.11, 0.39]} />
      <meshStandardMaterial color={deskColor} roughness={1} metalness={0} />
    </mesh>
    {/* Desk legs */}
    {[[-0.45, 0.2, 0.13], [0.45, 0.2, 0.13]].map(([x, y, z], i) => (
      <mesh key={i} position={[-1.1 + x, y, 1.15 + z]}>
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <meshStandardMaterial color={deskColor} roughness={1} metalness={0} />
      </mesh>
    ))}
    {/* Laptop */}
    <mesh position={[-1.1, 0.6, 1.23]}>
      <boxGeometry args={[0.29, 0.03, 0.17]} />
      <meshStandardMaterial color={laptop} roughness={1} metalness={0} />
    </mesh>
    {/* Lamp */}
    <mesh position={[-0.78, 0.63, 1.34]}>
      <sphereGeometry args={[0.08, 18, 18]} />
      <meshStandardMaterial color={lampShade} emissive={lampShade} emissiveIntensity={0.5} />
    </mesh>
    {/* Mug */}
    <mesh position={[-1.32, 0.6, 1.38]}>
      <cylinderGeometry args={[0.05, 0.05, 0.07, 14]} />
      <meshStandardMaterial color={mugColor} roughness={1} metalness={0} />
    </mesh>

    {/* Plant */}
    <mesh position={[0, 0.13, 0]}>
      <cylinderGeometry args={[0.08, 0.08, 0.13, 16]} />
      <meshStandardMaterial color={plantPot} roughness={1} metalness={0} />
    </mesh>
    <mesh position={[0, 0.22, 0]}>
      <sphereGeometry args={[0.12, 14, 14]} />
      <meshStandardMaterial color={plantLeaf} roughness={1} metalness={0} />
    </mesh>
  </>
);

export default Room;
