import React, { useRef, useCallback } from 'react'
import { Logo } from './Logo'
import { Spotlight } from './Spotlight'
import { Flex, Box } from '@react-three/flex'
import Text from './Text'
import { DichromaticMaterial } from './materials/Dichromatic'
import { BG_COLOR } from '../config'
import { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

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
        <mesh receiveShadow position={[0,0,-.0001]} onPointerMove={onPointerMove}>
          <planeGeometry args={[100,100]} />
          <DichromaticMaterial {...BG_COLOR} />
        </mesh>
        <mesh position={[-3,0,0]} castShadow>
          <Logo />
        </mesh>
        <Text textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a massa eget ipsum luctus hendrerit vitae nec elit. Fusce luctus tortor ligula, a porta augue vehicula ut.
        </Text>
      </group>
    </>
  )
}
