import React, { useRef, useCallback } from 'react'
import { Spotlight } from './objects/Spotlight'
import { DichromaticMaterial } from './materials/Dichromatic'
import { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { BG_COLOR } from '../config'
import { LandingPage } from './pages/LandingPage'

export function Scene({}): JSX.Element {
  const pointer = useRef<THREE.Vector3>(new THREE.Vector3(0))
  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    pointer.current.copy(e.point)
  }, [])
  return (
    <>
      <ambientLight color={'red'} intensity={1} />
      <Spotlight target={pointer} />
      <group position={[0,0,-1]}>
        <mesh
          receiveShadow
          position={[0,0,-.0001]}
          onPointerMove={onPointerMove}
        >
          <planeGeometry args={[100,100]} />
          <DichromaticMaterial {...BG_COLOR} />
        </mesh>
        <LandingPage />
      </group>
    </>
  )
}
