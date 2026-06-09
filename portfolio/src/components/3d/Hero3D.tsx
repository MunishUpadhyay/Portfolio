import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

// Deterministic pseudo-random number generator to satisfy React render purity rules
function createPRNG(seed = 12345) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280.0;
  };
}

interface LineComponentRef {
  material: {
    opacity: number;
  };
}

function Globe() {
  const [hovered, setHovered] = useState(false);
  const globeRef = useRef<THREE.Group>(null);
  const tiltGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Refs for the 26 nodes
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Refs for the 7 Drei Line components to change opacity dynamically
  const matRefs = useRef<(LineComponentRef | null)[]>([]);

  // Spring physics variables for globe scale and core scale
  const globeScale = useRef(1.0);
  const scaleVelocity = useRef(0);
  const coreScale = useRef(1.0);
  const coreScaleVel = useRef(0);

  // Mouse tilt tracking
  const tiltX = useRef(0);
  const tiltY = useRef(0);
  const tiltXVel = useRef(0);
  const tiltYVel = useRef(0);

  // Individual node spring scales
  const nodeScales = useRef<number[]>(Array(26).fill(1));
  const nodeVelocities = useRef<number[]>(Array(26).fill(0));

  // 1. Generate nodes mathematically (26 nodes on a sphere of radius 2.0)
  const nodes = useMemo(() => {
    const list = [];
    // North Pole (Fuchsia)
    list.push({ pos: new THREE.Vector3(0, 2.0, 0), color: '#ec4899', size: 0.16 });
    // South Pole (Fuchsia)
    list.push({ pos: new THREE.Vector3(0, -2.0, 0), color: '#ec4899', size: 0.16 });

    // Helper to generate a ring of 8 nodes at a given latitude height and radius
    const addLatitudeRing = (y: number, r: number, color: string, size: number) => {
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        list.push({
          pos: new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)),
          color,
          size
        });
      }
    };

    // Equator (Indigo) - Y = 0, R = 2.0
    addLatitudeRing(0, 2.0, '#6366f1', 0.15);

    // Northern Mid-Latitude (Cyan) - Y = 1.2, R = 1.6 (1.2^2 + 1.6^2 = 2.0^2)
    addLatitudeRing(1.2, 1.6, '#06b6d4', 0.13);

    // Southern Mid-Latitude (Cyan) - Y = -1.2, R = 1.6
    addLatitudeRing(-1.2, 1.6, '#06b6d4', 0.13);

    return list;
  }, []);

  // 2. Generate circle vertices helper for latitude lines
  const getCircleVertices = (radius: number, y: number) => {
    const temp = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      temp.push(new THREE.Vector3(radius * Math.cos(theta), y, radius * Math.sin(theta)));
    }
    return temp;
  };

  // 3. Generate circle vertices helper for longitude lines (rotated around Y)
  const getLongitudeVertices = (angle: number) => {
    const temp = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = 2.0 * Math.cos(theta) * Math.cos(angle);
      const z = 2.0 * Math.cos(theta) * Math.sin(angle);
      const y = 2.0 * Math.sin(theta);
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  };

  // Generate loop data
  const lat1Vertices = useMemo(() => getCircleVertices(2.0, 0), []);
  const lat2Vertices = useMemo(() => getCircleVertices(1.6, 1.2), []);
  const lat3Vertices = useMemo(() => getCircleVertices(1.6, -1.2), []);

  const long1Vertices = useMemo(() => getLongitudeVertices(0), []);
  const long2Vertices = useMemo(() => getLongitudeVertices(Math.PI / 4), []);
  const long3Vertices = useMemo(() => getLongitudeVertices(Math.PI / 2), []);
  const long4Vertices = useMemo(() => getLongitudeVertices((3 * Math.PI) / 4), []);

  const latLoops = useMemo(() => [
    { vertices: lat1Vertices, color: '#6366f1' },
    { vertices: lat2Vertices, color: '#06b6d4' },
    { vertices: lat3Vertices, color: '#06b6d4' }
  ], [lat1Vertices, lat2Vertices, lat3Vertices]);

  const longLoops = useMemo(() => [
    { vertices: long1Vertices, color: '#ec4899' },
    { vertices: long2Vertices, color: '#6366f1' },
    { vertices: long3Vertices, color: '#06b6d4' },
    { vertices: long4Vertices, color: '#a855f7' }
  ], [long1Vertices, long2Vertices, long3Vertices, long4Vertices]);

  // 4. Generate outer swirling stardust particles (150 particles)
  const stardust = useMemo(() => {
    const random = createPRNG(42);
    const count = 150;
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos((random() * 2) - 1);
      const r = 2.6 + random() * 0.8;
      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = r * Math.cos(phi);
    }
    return temp;
  }, []);

  const gridOpacity = useRef(0.30);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    // A. Spring physics for global globe expansion
    const targetScale = hovered ? 1.55 : 1.0;
    const forceScale = -220 * (globeScale.current - targetScale) - 14 * scaleVelocity.current;
    scaleVelocity.current += forceScale * dt;
    globeScale.current += scaleVelocity.current * dt;

    if (globeRef.current) {
      globeRef.current.scale.set(globeScale.current, globeScale.current, globeScale.current);
    }

    // B. Spring physics for central core scale
    const targetCoreScale = hovered ? 1.35 : 1.0;
    const forceCore = -200 * (coreScale.current - targetCoreScale) - 14 * coreScaleVel.current;
    coreScaleVel.current += forceCore * dt;
    coreScale.current += coreScaleVel.current * dt;

    if (coreRef.current) {
      const breathing = Math.sin(time * 2.2) * 0.03;
      const finalCoreScale = coreScale.current + breathing;
      coreRef.current.scale.set(finalCoreScale, finalCoreScale, finalCoreScale);
      coreRef.current.rotation.y += delta * 0.08;
    }

    // Flare inner light intensity on hover
    if (lightRef.current) {
      const targetIntensity = hovered ? 5.0 : 2.5;
      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity,
        targetIntensity,
        6,
        delta
      );
    }

    // C. Individual node spring scale & rotation
    for (let i = 0; i < 26; i++) {
      const targetNodeScale = hovered ? (1.3 + Math.sin(time * 3.5 + i) * 0.08) : 1.0;
      const k = 170 + (i % 5) * 12;
      const c = 11 + (i % 3) * 1;
      const forceNode = -k * (nodeScales.current[i] - targetNodeScale) - c * nodeVelocities.current[i];
      nodeVelocities.current[i] += forceNode * dt;
      nodeScales.current[i] += nodeVelocities.current[i] * dt;

      const mesh = nodeRefs.current[i];
      if (mesh) {
        const s = nodeScales.current[i];
        mesh.scale.set(s, s, s);
        mesh.rotation.y += delta * (0.15 + (i % 4) * 0.05);
        mesh.rotation.x += delta * (0.08 + (i % 3) * 0.025);
      }
    }

    // D. Grid lines opacity damping (Highly glowing range: 0.30 to 0.80)
    const targetOpacity = hovered ? 0.80 : 0.30;
    gridOpacity.current = THREE.MathUtils.damp(gridOpacity.current, targetOpacity, 6, delta);
    matRefs.current.forEach(lineMesh => {
      if (lineMesh && lineMesh.material) {
        lineMesh.material.opacity = gridOpacity.current;
      }
    });

    // E. Rotate stardust belt
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.08;
      particlesRef.current.rotation.x += delta * 0.03;
    }

    // F. Mouse spring parallax tilt + global slow rotation
    const targetTiltY = state.pointer.x * 0.65;
    const targetTiltX = -state.pointer.y * 0.65;

    const forceTiltX = -140 * (tiltX.current - targetTiltX) - 14 * tiltXVel.current;
    tiltXVel.current += forceTiltX * dt;
    tiltX.current += tiltXVel.current * dt;

    const forceTiltY = -140 * (tiltY.current - targetTiltY) - 14 * tiltYVel.current;
    tiltYVel.current += forceTiltY * dt;
    tiltY.current += tiltYVel.current * dt;

    if (tiltGroupRef.current) {
      tiltGroupRef.current.rotation.x = 0.45 + tiltX.current;
      // Combine steady rotation with mouse hover yaw drift
      tiltGroupRef.current.rotation.y = time * 0.04 + tiltY.current;
    }
  });

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={0.95}
    >
      <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.18}>
        {/* Parallax Tilt & Autorotation Group */}
        <group ref={tiltGroupRef}>
          
          {/* Swirling Stardust */}
          <points ref={particlesRef}>
            <bufferGeometry>
              {/* @ts-expect-error: ThreeJS bufferAttribute array typing mismatch */}
              <bufferAttribute
                attach="attributes-position"
                count={stardust.length / 3}
                array={stardust}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.035}
              color="#a855f7"
              sizeAttenuation={true}
              transparent={true}
              opacity={0.35}
            />
          </points>

          {/* Master Globe Scaling Group */}
          <group ref={globeRef}>
            
            {/* Central Glowing Orange Core */}
            <mesh ref={coreRef}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial
                color="#f97316"
                transparent={false}
                roughness={0.2}
                metalness={0.2}
                emissive="#f97316"
                emissiveIntensity={1.8}
              />
              <mesh scale={1.03}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshBasicMaterial color="#fca5a5" wireframe transparent opacity={0.2} />
              </mesh>
            </mesh>
            <pointLight ref={lightRef} distance={10} intensity={2.5} color="#f97316" />

            {/* Latitude Loops (Thick Glowing Drei Lines with depthWrite disabled to prevent overlapping dotted artifacts) */}
            {latLoops.map((loop, idx) => (
              <Line
                key={`lat-${idx}`}
                ref={el => { matRefs.current[idx] = el; }}
                points={loop.vertices}
                color={loop.color}
                lineWidth={2.8}
                transparent
                opacity={0.3}
                depthWrite={false}
                dashed={false}
              />
            ))}

            {/* Longitude Loops (Thick Glowing Drei Lines with depthWrite disabled to prevent overlapping dotted artifacts) */}
            {longLoops.map((loop, idx) => (
              <Line
                key={`long-${idx}`}
                ref={el => { matRefs.current[idx + 3] = el; }}
                points={loop.vertices}
                color={loop.color}
                lineWidth={2.8}
                transparent
                opacity={0.3}
                depthWrite={false}
                dashed={false}
              />
            ))}

            {/* 26 Solid Glossy Nodes (Symmetrical Shell) */}
            {nodes.map((node, idx) => (
              <mesh
                key={`node-${idx}`}
                ref={el => { nodeRefs.current[idx] = el; }}
                position={node.pos}
              >
                <sphereGeometry args={[node.size, 32, 32]} />
                <meshStandardMaterial
                  color={node.color}
                  roughness={0.2}
                  metalness={0.3}
                  emissive={node.color}
                  emissiveIntensity={0.8}
                  transparent={false}
                />
              </mesh>
            ))}

          </group>

        </group>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="h-[400px] md:h-[500px] w-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.55} />
        
        {/* Spotlights pointing at the system for beautiful specular gloss highlights */}
        <spotLight position={[0, 10, -10]} intensity={4} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={5} color="#06b6d4" />
        <pointLight position={[-10, -10, 10]} intensity={5} color="#d946ef" />
        
        <Globe />
        
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
