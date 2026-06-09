import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export const ConstellationBackground = () => {
  const globalGroupRef = useRef<THREE.Group>(null);
  
  const icosahedronRef1 = useRef<THREE.Mesh>(null);
  const icosahedronRef2 = useRef<THREE.Mesh>(null);
  const icosahedronRef3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Slow ambient rotation of background diamonds
    if (icosahedronRef1.current) {
      icosahedronRef1.current.rotation.x += delta * 0.12;
      icosahedronRef1.current.rotation.y += delta * 0.16;
    }

    if (icosahedronRef2.current) {
      icosahedronRef2.current.rotation.x -= delta * 0.08;
      icosahedronRef2.current.rotation.y -= delta * 0.14;
    }

    if (icosahedronRef3.current) {
      icosahedronRef3.current.rotation.x += delta * 0.06;
      icosahedronRef3.current.rotation.y -= delta * 0.1;
    }

    // Parallax mouse movements (drift the background group slightly)
    if (globalGroupRef.current) {
      globalGroupRef.current.position.x = THREE.MathUtils.damp(
        globalGroupRef.current.position.x,
        mouseX * 0.35,
        3,
        delta
      );
      globalGroupRef.current.position.y = THREE.MathUtils.damp(
        globalGroupRef.current.position.y,
        mouseY * 0.35,
        3,
        delta
      );
    }
  });

  return (
    <group ref={globalGroupRef}>
      {/* Space Ambient Lighting */}
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={2.5} color="#d946ef" />
      <pointLight position={[-5, -5, -5]} intensity={1.8} color="#6366f1" />

      {/* 1. Deep Space Twinkling Starfield */}
      <Stars radius={100} depth={60} count={3500} factor={5.5} saturation={0.5} fade speed={1.5} />

      {/* 2. Floating Diamond 1 (Top Left) - Indigo */}
      <mesh ref={icosahedronRef1} position={[-3.6, 2.0, -5.5]} scale={0.9}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe={true}
          transparent={true}
          opacity={0.55}
        />
      </mesh>

      {/* 3. Floating Diamond 2 (Bottom Right) - Pink */}
      <mesh ref={icosahedronRef2} position={[3.6, -2.0, -4.5]} scale={0.9}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ec4899"
          wireframe={true}
          transparent={true}
          opacity={0.50}
        />
      </mesh>

      {/* 4. Floating Diamond 3 (Bottom Left) - Purple */}
      <mesh ref={icosahedronRef3} position={[-4.2, -2.6, -6.5]} scale={1.1}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe={true}
          transparent={true}
          opacity={0.45}
        />
      </mesh>
    </group>
  );
};
