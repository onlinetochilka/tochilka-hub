import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import FloatingShapes from './FloatingShapes';
import { Suspense } from 'react';

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#f8fafc']} /> {/* Очень светлый фон, slate-50 */}
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#e2e8f0" />
        
        <Suspense fallback={null}>
          <FloatingShapes />
          <Environment preset="city" />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4} color="#94a3b8" />
        </Suspense>
      </Canvas>
    </div>
  );
}
