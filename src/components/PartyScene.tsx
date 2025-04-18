import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';

// Avatar components with more personality
const HumanAvatar = ({ position, rotation, color, scale = 1 }) => {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Avatar body */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.3, 1.2, 4, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.08, 1.7, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="white" />
        <mesh position={[0, 0, 0.03]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </mesh>
      
      <mesh position={[-0.08, 1.7, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="white" />
        <mesh position={[0, 0, 0.03]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </mesh>
    </group>
  );
};

// Tattooed avatar
const TattooedAvatar = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Avatar body with "tattoo" texture */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.3, 1.2, 4, 16]} />
        <meshStandardMaterial color="#d4a76a">
          <meshStandardMaterial color="#1a1a1a" wireframe />
        </meshStandardMaterial>
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshStandardMaterial color="#d4a76a" />
      </mesh>
      
      {/* Tattoo patterns represented as thin cylinders */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.33, 0.03, 16, 24]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      <mesh position={[0, 1.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <torusGeometry args={[0.33, 0.03, 16, 24]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.33, 0.03, 16, 24]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

// Furry avatar
const FurryAvatar = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Furry body */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.35, 1.0, 8, 16]} />
        <meshStandardMaterial color="#b2802e" roughness={1} />
      </mesh>
      
      {/* Furry head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial color="#b2802e" roughness={1} />
      </mesh>
      
      {/* Ears */}
      <mesh position={[0.15, 1.9, 0]}>
        <coneGeometry args={[0.1, 0.3, 16]} />
        <meshStandardMaterial color="#b2802e" roughness={1} />
      </mesh>
      <mesh position={[-0.15, 1.9, 0]}>
        <coneGeometry args={[0.1, 0.3, 16]} />
        <meshStandardMaterial color="#b2802e" roughness={1} />
      </mesh>
      
      {/* Snout */}
      <mesh position={[0, 1.6, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.14, 0.2, 8, 16]} />
        <meshStandardMaterial color="#d4a76a" roughness={0.8} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.1, 1.7, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.1, 1.7, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0.35, -0.4]} rotation={[Math.PI / -4, 0, 0]}>
        <capsuleGeometry args={[0.08, 0.6, 8, 16]} />
        <meshStandardMaterial color="#b2802e" roughness={1} />
      </mesh>
    </group>
  );
};

// Party cup props
const PartyCup = ({ position, color }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.15, 16]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.2} />
      </mesh>
    </group>
  );
};

// DJ table
const DJTable = ({ position }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Table legs */}
      <mesh position={[-0.65, 0, -0.35]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      <mesh position={[0.65, 0, -0.35]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      <mesh position={[-0.65, 0, 0.35]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      <mesh position={[0.65, 0, 0.35]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* DJ Equipment */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      
      {/* Mixer */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Turntables */}
      <mesh position={[-0.45, 0.65, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <meshStandardMaterial color="#111111" />
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
      </mesh>
      
      <mesh position={[0.45, 0.65, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <meshStandardMaterial color="#111111" />
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
      </mesh>
    </group>
  );
};

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
            <meshStandardMaterial color="#111" />
          </mesh>
          
          {/* Club furniture */}
          <DJTable position={[-2, 0, -3]} />
          
          {/* More detailed avatars */}
          <HumanAvatar 
            position={[-1.2, 0, -0.5]} 
            rotation={[0, Math.PI / 6, 0]} 
            color="#8B5CF6" 
          />
          
          <HumanAvatar 
            position={[0.8, 0, -0.8]} 
            rotation={[0, -Math.PI / 4, 0]} 
            color="#D946EF" 
            scale={0.9}
          />
          
          <TattooedAvatar 
            position={[0.5, 0, 0.5]} 
            rotation={[0, Math.PI / 3, 0]} 
          />
          
          <FurryAvatar 
            position={[-0.8, 0, 0.7]} 
            rotation={[0, -Math.PI / 5, 0]} 
          />
          
          {/* Party cups */}
          <PartyCup position={[-0.9, 0.95, -0.3]} color="#ff5555" />
          <PartyCup position={[0.6, 0.95, 0.3]} color="#55ffff" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PartyScene;
