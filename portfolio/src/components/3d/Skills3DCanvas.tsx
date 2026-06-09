import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { SkillsConstellation } from './SkillsConstellation';

export default function Skills3DCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5.6], fov: 60 }}>
      <ambientLight intensity={0.65} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />
      <Suspense fallback={null}>
        <SkillsConstellation />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
