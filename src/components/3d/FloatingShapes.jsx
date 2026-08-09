import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingShapes() {
  const group = useRef();
  
  // Создаем материал для объектов (светлый, матовый с легким блеском)
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.2,
    metalness: 0.1,
    transmission: 0.5, // Эффект стекла
    thickness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }), []);

  // Анимация реакции на мышь
  useFrame((state) => {
    if (group.current) {
      const { x, y } = state.pointer;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (y * Math.PI) / 10, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (x * Math.PI) / 10, 0.05);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron args={[1, 1]} position={[-3, 1, -2]} material={material} />
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Torus args={[0.8, 0.2, 16, 32]} position={[3, 2, -3]} rotation={[Math.PI / 4, 0, 0]} material={material} />
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere args={[0.6, 32, 32]} position={[0, -2, -1]} material={material} />
      </Float>

      <Float speed={1} rotationIntensity={2} floatIntensity={1}>
        <Icosahedron args={[0.8, 0]} position={[-2, -2.5, -4]} material={material} />
      </Float>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Torus args={[1.2, 0.15, 16, 50]} position={[4, -1, -5]} rotation={[0, Math.PI / 3, 0]} material={material} />
      </Float>
    </group>
  );
}
