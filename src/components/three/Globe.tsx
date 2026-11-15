import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const cities: [number, number][] = [[19, 72.8], [51.5, -0.1], [40.7, -74], [35.7, 139.7], [-33.9, 151.2], [48.9, 2.3], [1.3, 103.8], [34, -118.2], [-23.5, -46.6], [25.2, 55.3]];
const toV = (lat: number, lon: number, r = 1) => {
  const phi = (90 - lat) * (Math.PI / 180), th = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

function G() {
  const ref = useRef<THREE.Group>(null);
  const dots = useMemo(() => {
    const n = 2200, arr = new Float32Array(n * 3), golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = golden * i;
      arr.set([Math.cos(t) * r, y, Math.sin(t) * r], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(arr, 3)); return g;
  }, []);
  const arcs = useMemo(() => {
    const pairs: [number, number][] = [[0, 1], [1, 2], [0, 3], [3, 4], [5, 0], [6, 9], [7, 2], [8, 5], [9, 1], [6, 3]];
    const mat = new THREE.LineBasicMaterial({ color: "#D4FF3A", transparent: true, opacity: 0.7 });
    return pairs.map(([a, b]) => {
      const ca = cities[a]!, cb = cities[b]!; const va = toV(ca[0], ca[1]), vb = toV(cb[0], cb[1]);
      const mid = va.clone().add(vb).multiplyScalar(0.5).normalize().multiplyScalar(1 + va.distanceTo(vb) * 0.35);
      const pts = new THREE.QuadraticBezierCurve3(va, mid, vb).getPoints(48);
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    });
  }, []);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += Math.min(d, 0.05) * 0.08; });
  return (
    <group ref={ref} rotation={[0.35, 0, 0]}>
      <points geometry={dots}><pointsMaterial size={0.012} color="#9A98A6" transparent opacity={0.6} /></points>
      {arcs.map((l, i) => <primitive key={i} object={l} />)}
      {cities.map((c, i) => (
        <mesh key={i} position={toV(...c, 1.005)}><sphereGeometry args={[0.012, 8, 8]} /><meshBasicMaterial color="#D4FF3A" /></mesh>
      ))}
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 40 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <G />
    </Canvas>
  );
}
