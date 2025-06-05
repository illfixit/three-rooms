import React from "react";

const wallColor = "#e1b8a7";
const floorColor = "#a37d63";
const wood = "#6b4636";
const bedsheet = "#f3bcbc";
const pillow = "#fff6f1";
const blanket = "#e49b9b";
const deskColor = "#8b7a6a";
const laptop = "#878787";
const lampShade = "#ffe285";
const plantPot = "#91745e";
const plantLeaf = "#71a96b";

const SIZE = 4; // Room is 4x4x4 units

const Room: React.FC = () => (
  <>
    {/* Floor */}
    <mesh position={[0, 0, 0]} receiveShadow>
      <boxGeometry args={[SIZE, 0.1, SIZE]} />
      <meshStandardMaterial color={floorColor} />
    </mesh>

    {/* Left Wall */}
    <mesh position={[0, SIZE / 2, -SIZE / 2]}>
      <boxGeometry args={[SIZE, SIZE, 0.1]} />
      <meshStandardMaterial color={wallColor} />
    </mesh>



    {/* Right Wall */}
    <mesh position={[-SIZE / 2, SIZE / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
      <boxGeometry args={[SIZE, SIZE, 0.1]} />
      <meshStandardMaterial color={wallColor} />
    </mesh>

    {/* BED - back left */}
    <mesh position={[-SIZE / 2 + 0.75, 0.25, -SIZE / 2 + 1.1]}>
      <boxGeometry args={[1.5, 0.4, 1]} />
      <meshStandardMaterial color={bedsheet} />
    </mesh>
    {/* Pillow */}
    <mesh position={[-SIZE / 2 + 1.1, 0.45, -SIZE / 2 + 1.45]}>
      <boxGeometry args={[0.6, 0.15, 0.35]} />
      <meshStandardMaterial color={pillow} />
    </mesh>
    {/* Blanket */}
    <mesh position={[-SIZE / 2 + 0.75, 0.36, -SIZE / 2 + 1.1]}>
      <boxGeometry args={[1.5, 0.1, 0.6]} />
      <meshStandardMaterial color={blanket} />
    </mesh>
    {/* Headboard */}
    <mesh position={[-SIZE / 2 + 0.75, 0.6, -SIZE / 2 + 1.6]}>
      <boxGeometry args={[1.5, 0.35, 0.12]} />
      <meshStandardMaterial color={wood} />
    </mesh>

    {/* Desk - back right */}
    <mesh position={[SIZE / 2 - 0.8, 0.45, -SIZE / 2 + 1.2]}>
      <boxGeometry args={[1.2, 0.13, 0.45]} />
      <meshStandardMaterial color={deskColor} />
    </mesh>
    {/* Desk legs */}
    {[
      [0.45, 0.18, 0.15], [-0.45, 0.18, 0.15]
    ].map(([x, y, z], i) => (
      <mesh key={i} position={[SIZE / 2 - 0.8 + x, y, -SIZE / 2 + 1.2 + z]}>
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <meshStandardMaterial color={deskColor} />
      </mesh>
    ))}
    {/* Laptop */}
    <mesh position={[SIZE / 2 - 0.8, 0.56, -SIZE / 2 + 1.35]}>
      <boxGeometry args={[0.32, 0.03, 0.25]} />
      <meshStandardMaterial color={laptop} />
    </mesh>
    {/* Lamp */}
    <mesh position={[SIZE / 2 - 0.4, 0.60, -SIZE / 2 + 1.45]}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshStandardMaterial color={lampShade} emissive={lampShade} emissiveIntensity={0.3} />
    </mesh>
    {/* Mug */}
    <mesh position={[SIZE / 2 - 1.1, 0.56, -SIZE / 2 + 1.48]}>
      <cylinderGeometry args={[0.06, 0.06, 0.10, 18]} />
      <meshStandardMaterial color="#fff" />
    </mesh>

    {/* Plant - center */}
    <mesh position={[0, 0.11, 0]}>
      <cylinderGeometry args={[0.08, 0.08, 0.13, 14]} />
      <meshStandardMaterial color={plantPot} />
    </mesh>
    <mesh position={[0, 0.20, 0]}>
      <sphereGeometry args={[0.13, 12, 12]} />
      <meshStandardMaterial color={plantLeaf} />
    </mesh>
  </>
);

export default Room;
