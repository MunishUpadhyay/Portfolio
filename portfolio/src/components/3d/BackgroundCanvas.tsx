import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ConstellationBackground } from './ConstellationBackground';

export default function BackgroundCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Suspense fallback={null}>
        <ConstellationBackground />
      </Suspense>
    </Canvas>
  );
}
