import React from 'react'
import { Canvas } from '@react-three/fiber'

export function Scene({}): JSX.Element {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0,0,0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'hotpink'} />
      </mesh>
    </Canvas>
  )
}
