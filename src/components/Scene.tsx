import React, { useRef, useCallback } from 'react'
import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'
import { BG_COLOR } from '../config'
import { FlashLight, SpotLight } from './objects/FlashLight'
import { DichromaticMaterial } from './materials/Dichromatic'
import { LandingPage } from './pages/LandingPage'
import { Layer } from './objects/Layer'

const flashLightPosition = new THREE.Vector3(0,0,5)

export function Scene({}): JSX.Element {
  const pointer = useRef<THREE.Vector3>(new THREE.Vector3(0))
  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    pointer.current.copy(e.point)
  }, [])
  return (
    <>
      <Layer layer={2}>
        <ambientLight color={0xfff3e3} intensity={1} />
        <spotLight
          castShadow
          distance={10}
          intensity={1.5}
          penumbra={0}
          decay={1}
          angle={.8}
          color={'hotpink'}
          position={[0,0,-1]}
        />
        <FlashLight target={pointer} z={5} />
      </Layer>
      <Layer layer={1}>
        <ambientLight color={'red'} intensity={1} />
        <SpotLight target={pointer} z={5} />
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
      </Layer>
    </>
  )
}
