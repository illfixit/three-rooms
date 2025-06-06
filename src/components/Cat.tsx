import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BLINK_INTERVAL = 2.5; // seconds between blinks
const BLINK_DURATION = 0.18; // seconds eyes stay closed
const TAIL_INTERVAL = 1.0; // seconds between tail moves
const TAIL_SWING = 0.8; // swing angle (reduced for subtle movement)

const Cat = (props: any) => {
  const [blink, setBlink] = useState(false);
  const [tailAngle, setTailAngle] = useState(0);
  const blinkTimer = useRef(0);
  const tailTimer = useRef(0);
  const tailDirection = useRef(1);
  const tailRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Blinking logic
    blinkTimer.current += delta;
    if (!blink && blinkTimer.current > BLINK_INTERVAL + Math.random() * 1.5) {
      setBlink(true);
      blinkTimer.current = 0;
    } else if (blink && blinkTimer.current > BLINK_DURATION) {
      setBlink(false);
      blinkTimer.current = 0;
    }

    // Tail sway logic (soft left-right movement)
    tailTimer.current += delta;
    if (tailTimer.current > TAIL_INTERVAL + Math.random() * 2) {
      tailDirection.current *= -1;
      setTailAngle(tailDirection.current * TAIL_SWING);
      tailTimer.current = 0;
    } else if (tailRef.current) {
      // Smoothly interpolate tail back to center
      tailRef.current.rotation.y += ((tailAngle - tailRef.current.rotation.y) * 0.02);
    }
  });

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

      {/* Cat tail (soft left-right sway) */}
      <mesh
        ref={tailRef}
        position={[0, 0.15, -0.25]}
        rotation={[Math.PI / 6, 0, 0]} // slight upward curve
      >
        <boxGeometry args={[0.05, 0.05, 0.2]} />
        <meshStandardMaterial color="#5d5d5d" roughness={1} metalness={0} />
      </mesh>

      {/* Cat eyes (blink by scaling Y to 0) */}
      <mesh
        position={[-0.05, 0.28, 0.24]}
        scale={[1, blink ? 0.1 : 1, 1]}
      >
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#ff9d00"
          emissive="#ff9d00"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh
        position={[0.05, 0.28, 0.24]}
        scale={[1, blink ? 0.1 : 1, 1]}
      >
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
