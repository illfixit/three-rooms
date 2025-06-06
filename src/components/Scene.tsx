import React, { useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Room from "./Room";
import { OrthographicCamera } from "@react-three/drei";

const Scene: React.FC = () => {
  const controlsRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleControlsEnd = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to rotate back to original position after 2 seconds
    timeoutRef.current = setTimeout(() => {
      if (controlsRef.current) {
        // Original azimuth angle (45 degrees)
        const targetAzimuth = Math.PI / 4;
        const targetPolar = Math.PI / 3;

        controlsRef.current.setAzimuthalAngle(targetAzimuth);
        controlsRef.current.setPolarAngle(targetPolar);
        controlsRef.current.update();
      }
    }, 500);
  }, []);

  return (
    <Canvas className="w-full h-screen" shadows>
      <ambientLight intensity={0.3} />
      <directionalLight position={[6, 5, 1]} intensity={1} castShadow />
      {/* Place camera at a 3-corner iso view */}
      <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={60} />
      <OrbitControls
        ref={controlsRef}
        onEnd={handleControlsEnd}
        enablePan={true}
        enableZoom={true}
        maxPolarAngle={Math.PI / 3}
        minPolarAngle={Math.PI / 3}
        minAzimuthAngle={Math.PI / 4 - Math.PI / 6} // 45° - 30° = 15°
        maxAzimuthAngle={Math.PI / 4 + Math.PI / 6} // 45° + 30° = 75°
        enableRotate={true}
      />
      {/* <axesHelper args={[6]} /> */}

      {/* Move room so the bottom corner between walls is at origin */}
      <group position={[0, -2, 0]}>
        <Room />
      </group>
    </Canvas>
  );
};

export default Scene;
