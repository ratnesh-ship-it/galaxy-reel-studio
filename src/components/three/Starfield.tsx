import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import nebulaUrl from "@/assets/nebula-teal.jpg";
import { sceneColor } from "./sceneTheme";

const vert = `
attribute float aSize; attribute float aPhase;
uniform float uTime; varying float vAlpha;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * (300.0 / -mv.z);
  vAlpha = 0.55 + 0.45 * sin(uTime * 0.8 + aPhase);
}`;
const frag = `
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vAlpha;
  gl_FragColor = vec4(0.93, 0.92, 0.89, a);
}`;

function Stars({ count, still }: { count: number; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3), size = new Float32Array(count), phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 20 + Math.random() * 80, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      pos.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3);
      size[i] = Math.random() < 0.03 ? 2.2 : 0.4 + Math.random() * 0.9;
      phase[i] = Math.random() * 10;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    return g;
  }, [count]);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const timeRef = uniforms.uTime;
  useFrame((state, delta) => {
    if (still || !group.current || !mat.current) return;
    const dt = Math.min(delta, 0.05);
    timeRef.value += dt;
    const g = group.current;
    g.rotation.y += dt * 0.004;
    const tx = state.pointer.y * 0.04 + window.scrollY * 0.00008;
    const ty = state.pointer.x * 0.05;
    g.rotation.x += (tx - g.rotation.x) * 0.03;
    g.rotation.z += (ty * 0.3 - g.rotation.z) * 0.03;
  });
  return (
    <group ref={group}>
      <points geometry={geo}>
        <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <Nebula still={still} />
    </group>
  );
}

function Nebula({ still }: { still: boolean }) {
  const tex = useLoader(THREE.TextureLoader, nebulaUrl);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (!still && ref.current) ref.current.rotation.z += Math.min(d, 0.05) * 0.003; });
  return (
    <mesh ref={ref} position={[0, 0, -90]} rotation={[0, 0, -0.35]}>
      <planeGeometry args={[260, 146]} />
      <meshBasicMaterial map={tex} color={sceneColor("--brand-teal")} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

export default function Starfield() {
  const mobile = window.innerWidth < 768;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas camera={{ position: [0, 0, 0.1], fov: 70 }} dpr={[1, 1.5]} frameloop={still ? "demand" : "always"} gl={{ antialias: false, alpha: true }}>
      <Stars count={mobile ? 1500 : 4000} still={still} />
    </Canvas>
  );
}
