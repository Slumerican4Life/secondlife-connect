
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

const PartyScene = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-b from-virtual-900 to-virtual-700">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <OrbitControls 
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
          
          {/* Party lighting */}
          <ambientLight intensity={0.4} />
          <spotLight 
            position={[-2, 5, 2]} 
            angle={0.15} 
            penumbra={1} 
            intensity={0.8} 
            color="#f0f" 
          />
          <spotLight 
            position={[2, 5, 2]} 
            angle={0.15} 
            penumbra={1} 
            intensity={0.8} 
            color="#0ff" 
          />
          
          {/* Dance floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.4} />
          </mesh>
          
          {/* Placeholder avatars as simple meshes until we have proper models */}
          <mesh position={[-1, 0, 0]}>
            <capsuleGeometry args={[0.3, 1, 4, 16]} />
            <meshStandardMaterial color="#8B5CF6" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[1, 0, -1]} rotation={[0, Math.PI / 4, 0]}>
            <capsuleGeometry args={[0.3, 1, 4, 16]} />
            <meshStandardMaterial color="#D946EF" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0.5, 0, 1]} rotation={[0, -Math.PI / 6, 0]}>
            <capsuleGeometry args={[0.3, 1, 4, 16]} />
            <meshStandardMaterial color="#F97316" metalness={0.5} roughness={0.4} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PartyScene;
