import React, { useRef, useCallback } from 'react'
import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'
import { BG_COLOR } from '../config'
import { FlashLight } from './objects/FlashLight'
import { DichromaticMaterial } from './materials/Dichromatic'
import { LandingPage } from './pages/LandingPage'

export function Scene({}): JSX.Element {
  const pointer = useRef<THREE.Vector3>(new THREE.Vector3(0))
  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    pointer.current.copy(e.point)
  }, [])
  return (
    <>
      <ambientLight color={'red'} intensity={1} />
      <FlashLight target={pointer} />
      <group position={[0,0,0]}>
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
