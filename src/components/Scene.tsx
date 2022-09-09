import React from 'react'
import { Logo } from './Logo'
import { useDepthBuffer } from '@react-three/drei'
import { Background } from './Background'
import { Spotlight } from './Spotlight'

export function Scene({}): JSX.Element {
  const depthBuffer = useDepthBuffer({ size: 256 })
  return (
    <>
      <ambientLight color={0x404040} intensity={1.6} />
      <Spotlight />
      <mesh position={[-3,0,0]} castShadow>
        <Logo />
      </mesh>
      <Background />
    </>
  )
}
