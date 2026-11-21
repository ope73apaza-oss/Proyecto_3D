import { useState, useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import type { Mesh } from 'three';

function Rombo() {
  const rombo = useRef<Mesh>(null)
  const [color] = useState('tomato')
  const [encima, setEncima] = useState(false)
  const [girar, setGirar] = useState(true)

  useFrame((_ , delta) => {
    if (rombo.current && girar) {
      rombo.current.rotation.y += delta * 2;
      rombo.current.rotation.x += delta * 1;
    }
  })

  return (
    <mesh
      ref={rombo}
      position={[-2, 0, -3]}
      scale={encima ? 1.4 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={() => setGirar((prev) => !prev)}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Cono() {
  const cono = useRef<Mesh>(null)
  const [color] = useState('deepskyblue')
  const [encima, setEncima] = useState(false)
  const [girar, setGirar] = useState(true)

  useFrame((state, delta) => {
    if (cono.current && girar) {
      cono.current.rotation.y += delta * 2.5;
      cono.current.rotation.z += delta * 1.2;
      cono.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  })

  return (
    <mesh
      ref={cono}
      position={[2, 0, -3]}
      scale={encima ? 1.4 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
      onClick={() => setGirar((prev) => !prev)}
    >
      <coneGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Environment files="360.jpg" background />
      <Rombo />
      <Cono />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.4}
      />
    </Canvas>
  )
}

export default App