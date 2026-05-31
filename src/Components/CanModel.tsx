import React, { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Mesh: any = "mesh";
const SphereGeometry: any = "sphereGeometry";
const MeshStandardMaterial: any = "meshStandardMaterial";
const Primitive: any = "primitive";

const CanModel = ({ modelPath, scale = 1, position = [0, 0, 0], rotationSpeed = 0 }: any) => {
  const { scene } = useGLTF(modelPath as string) as any;
  const modelRef = useRef<any>(null);

  // Cache cloned model so it doesn't reload on every render
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame(() => {
    if (modelRef.current && rotationSpeed > 0) {
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  return <Primitive ref={modelRef} object={clonedScene} scale={scale} position={position} />;
};

// ✅ Preload all models for faster switching
[
  "/model/red_bull_energy_drink_can.glb",
  "/model/monster_energy_drink.glb",
  "/model/monster_can/scene.gltf",
  "/model/orange.glb",
  "/model/pink.glb",
  "/model/lit.glb"
].forEach(path => useGLTF.preload(path));

export default function CanModelWithSuspense(props: any) {
  return (
    <Suspense
      fallback={
        <Mesh>
          <SphereGeometry args={[0.2, 16, 16]} />
          <MeshStandardMaterial color="#444" />
        </Mesh>
      }
    >
      <CanModel {...props} />
    </Suspense>
  );
}
