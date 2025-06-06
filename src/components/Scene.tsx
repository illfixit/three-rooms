import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Room from "./Room";
import { OrthographicCamera } from "@react-three/drei";


const Scene: React.FC = () => (
  <Canvas className="w-full h-screen" shadows>
    <ambientLight intensity={0.3} />
    <directionalLight position={[8, 12, 8]} intensity={1} castShadow />
    {/* Place camera at a 3-corner iso view */}
    <OrthographicCamera
  makeDefault
  position={[10, 10, 10]}
  zoom={50}
/>
    <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI/3} minPolarAngle={Math.PI/3} 
  maxAzimuthAngle={Math.PI} minAzimuthAngle={-Math.PI}
  enableRotate={true} 
    />
    { /* <axesHelper args={[6]} /> */ }
    <Room />
  </Canvas>
);

export default Scene;
