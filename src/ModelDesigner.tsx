import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

interface BoxProps {
  position: [number, number, number];
}

function RotatingBox({ position }: BoxProps) {
  const meshRef = useRef<Mesh>(null!);
  const [speed] = useState(0.01);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function ModelDesigner() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  return (
    <div>
      <Canvas style={{ width: '100%', height: '400px' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingBox position={[x, y, z]} />
        <OrbitControls />
      </Canvas>
      <div style={{ marginTop: '1rem' }}>
        <label>
          X:
          <input type="range" min="-5" max="5" step="0.1" value={x}
            onChange={(e) => setX(parseFloat(e.target.value))} />
        </label>
        <label>
          Y:
          <input type="range" min="-5" max="5" step="0.1" value={y}
            onChange={(e) => setY(parseFloat(e.target.value))} />
        </label>
        <label>
          Z:
          <input type="range" min="-5" max="5" step="0.1" value={z}
            onChange={(e) => setZ(parseFloat(e.target.value))} />
        </label>
      </div>
    </div>
  );
}
