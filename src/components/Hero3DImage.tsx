import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";
import logo from "@/assets/Pngtreeartificial.png";


function FloatingImage({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture] = useState(() => new THREE.TextureLoader().load(textureUrl));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 1.2) * 0.2 + 0.2;
      meshRef.current.rotation.y = !isMobile && hovered ? Math.sin(t * 2) * 0.2 : 0;
      meshRef.current.scale.setScalar(!isMobile && hovered ? 1.08 : 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => !isMobile && setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[2.5, 2.5]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

export default function Hero3DImage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-[640px] md:h-[720px] flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} shadows style={{ pointerEvents: isMobile ? "none" : "auto" }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 2]} intensity={0.7} />
        <FloatingImage textureUrl= {logo} />
        {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
}
