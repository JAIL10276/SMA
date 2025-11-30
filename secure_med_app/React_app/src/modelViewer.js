/**
import * as THREE from "three";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Load the GLTF model
function StethoscopeModel() {
  const { scene } = useGLTF("/models/Stethoscope/scene.gltf");
  return <primitive object={scene} scale={0.35} position={[0,0,0]} />;
}
function LockModel() {
  const { scene } = useGLTF("/models/Lock/scene.gltf");
  return <primitive object={scene} scale={0.03} position={[0,-1.115,0.25]}/>;
}
// Main 3D viewer
export default function ModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={10} />
      <directionalLight position={[5, 5, 5]} intensity={5} />

      <Suspense fallback={null}>
        <StethoscopeModel />
        <LockModel />
      </Suspense>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
*/
