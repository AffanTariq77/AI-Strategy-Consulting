import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";
import logo from "@/assets/pngwing.com.png";


function FloatingImage({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
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
      // Subtle floating motion
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.15;
      
      // Keep it facing camera - no rotation on X and Z
      meshRef.current.rotation.y = 0;
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.z = 0;
      
      // Pulsing scale effect
      const pulseScale = 0.9 + Math.sin(t * 2) * 0.1;
      meshRef.current.scale.setScalar(pulseScale);
    }
    
    // Pulsing glow effect
    if (glowRef.current) {
      const glowIntensity = 1 + Math.sin(t * 2.5) * 0.5;
      glowRef.current.intensity = glowIntensity;
    }
  });

  return (
    <>
      <pointLight ref={glowRef} position={[0, 0, 1]} color="#0050b4" intensity={0.8} distance={8} />
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
    </>
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
