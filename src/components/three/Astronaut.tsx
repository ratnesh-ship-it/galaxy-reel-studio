import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer } from "@react-three/drei";
import { Suspense, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import asset from "@/assets/Astronaut.glb.asset.json";
import { sceneColor } from "./sceneTheme";

function Model({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  const { scene } = useGLTF(asset.url);
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = ref.current; if (!g) return;
    const t = state.clock.elapsedTime, dt = Math.min(delta, 0.05);
    const s = scrollRef.current;
    g.position.y = -0.75 + Math.sin(t * 0.6) * 0.12 + s * 2.2;
    g.position.x = s * 0.6;
    g.rotation.y += dt * 0.12;
    g.rotation.x += ((state.pointer.y * -0.15) - g.rotation.x) * 0.04;
    g.rotation.z += ((state.pointer.x * 0.12) + Math.sin(t * 0.4) * 0.08 - g.rotation.z) * 0.04;
  });
  return <primitive ref={ref} object={scene} scale={0.42} />;
}

export default function Astronaut({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  const starlight = sceneColor("--scene-starlight"), bright = sceneColor("--brand-teal-bright"), teal = sceneColor("--brand-teal");
  return (
    <Canvas camera={{ position: [0, 0.3, 4.2], fov: 35 }} dpr={[1, 1.75]} gl={{ alpha: true }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 2, 2]} intensity={1.6} color={starlight} />
      <pointLight position={[-2.5, 0.5, 1.5]} intensity={3} color={bright} distance={8} />
      <pointLight position={[2, -1, -1.5]} intensity={4} color={teal} distance={8} />
      <Environment resolution={64}>
        <Lightformer intensity={1.2} position={[0, 4, 2]} scale={[6, 6, 1]} color={starlight} />
        <Lightformer intensity={0.3} position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[8, 1, 1]} color={bright} />
        <Lightformer intensity={0.8} position={[4, 0, 1]} rotation-y={-Math.PI / 2} scale={[8, 1, 1]} color={teal} />
      </Environment>
      <Suspense fallback={null}><Model scrollRef={scrollRef} /></Suspense>
    </Canvas>
  );
}
