import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '../../data/portfolio';

// Deterministic pseudo-random number generator to satisfy React render purity rules
function createPRNG(seed = 12345) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280.0;
  };
}

// Helper to resolve clean, category-based colors for consistency
const getSkillColor = (domain: string) => {
  switch (domain) {
    case 'programming': return '#c084fc'; // Purple (Foundations)
    case 'datascience': return '#f472b6'; // Pink (AI/ML)
    case 'computervision': return '#f472b6'; // Pink (Computer Vision)
    case 'web': return '#34d399';         // Emerald (Web Dev)
    case 'backend': return '#34d399';     // Emerald (Backend)
    case 'database': return '#22d3ee';    // Cyan (Databases)
    case 'devops': return '#fbbf24';      // Amber (DevOps & Cloud)
    case 'tools': return '#94a3b8';       // Slate (Tools)
    default: return '#c084fc';
  }
};

// Helper to shorten overly long names for clean rendering in 3D space
const getShortName = (name: string) => {
  if (name === 'Large Language Models / LLMs') return 'LLMs';
  if (name === 'RAG - Retrieval Augmented Generation') return 'RAG';
  if (name === 'Django REST Framework') return 'DRF';
  if (name === 'Google Colab') return 'Colab';
  return name;
};

export const SkillsConstellation = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Distribute all active skills in the data catalog
  const selectedSkills = useMemo(() => {
    const targetTech = [
      'Python', 'C++', 'Java', 'SQL', 
      'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV',
      'Large Language Models / LLMs', 'Generative AI', 'RAG - Retrieval Augmented Generation',
      'Django', 'Django REST Framework', 'FastAPI', 'React', 'Celery',
      'MySQL', 'PostgreSQL', 'ChromaDB', 'Redis', 'JDBC',
      'Docker', 'AWS', 'Render', 'Vercel', 'CI/CD', 'Git', 'GitHub',
      'Jupyter', 'Google Colab'
    ];
    return skills.filter((s) => targetTech.includes(s.name));
  }, []);

  // Fibonacci Sphere algorithm to distribute points evenly on a sphere of radius R
  const points = useMemo(() => {
    const coords: [number, number, number][] = [];
    const count = selectedSkills.length;
    const r = 2.5; // Radius of the skills sphere

    for (let i = 0; i < count; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
      const phi = Math.PI * (1 + 5 ** 0.5) * i;

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      coords.push([x, y, z]);
    }
    return coords;
  }, [selectedSkills]);

  // Generate random background stars (reduced to 400 for maximum performance)
  const particles = useMemo(() => {
    const random = createPRNG(1337);
    const count = 400;
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = random();
      const v = random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.8 + random() * 1.6; // Shell radius between 1.8 and 3.4

      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = r * Math.cos(phi);
    }
    return temp;
  }, []);

  // Slowly rotate the entire constellation (slower speeds for cinematic smooth look)
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
      groupRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Centered glowing cosmic core */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.25} />
      </mesh>

      {/* 2. Swirling Particle Cloud */}
      <points>
        <bufferGeometry>
          {/* @ts-expect-error: ThreeJS bufferAttribute array typing mismatch */}
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#8b5cf6"
          sizeAttenuation={true}
          transparent={true}
          opacity={0.45}
        />
      </points>

      {/* 3. Outer Constellation wireframe guidelines */}
      <mesh>
        <sphereGeometry args={[2.5, 12, 12]} />
        <meshBasicMaterial
          color="#6366f1"
          wireframe={true}
          transparent={true}
          opacity={0.08}
        />
      </mesh>

      {/* 4. Floating HTML tags & vertex nodes */}
      {selectedSkills.map((skill, idx) => {
        const pos = points[idx];
        const color = getSkillColor(skill.domain);

        return (
          <group key={skill.name} position={pos}>
            {/* Projected holographic HTML text tag (constant scale for uniform sizing) */}
            <Html center={true}>
              <div
                style={{
                  color: color,
                  textShadow: `0 0 6px ${color}50`
                }}
                className="text-[11px] font-semibold tracking-wide whitespace-nowrap select-none flex items-center gap-1.5 transition-all duration-300 hover:scale-110 cursor-default opacity-90"
              >
                <span>{skill.icon}</span>
                <span>{getShortName(skill.name)}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
