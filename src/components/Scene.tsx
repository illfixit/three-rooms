import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Room from "./Room";
import { OrthographicCamera } from "@react-three/drei";


const Scene: React.FC = () => (
  <Canvas className="w-full h-screen" shadows>
    <ambientLight intensity={0.7} />
    <directionalLight position={[8, 12, 8]} intensity={1} castShadow />
    {/* Place camera at a 3-corner iso view */}
    <OrthographicCamera
  makeDefault
  position={[10, 10, 10]}
  zoom={50}
/>
    <OrbitControls enablePan={true} enableZoom={false} maxPolarAngle={0} minPolarAngle={Math.PI/3} 
  maxAzimuthAngle={Math.PI/4} minAzimuthAngle={-Math.PI/4}
  enableRotate={false} 
    />
    <Room />
  </Canvas>
);

export default Scene;
