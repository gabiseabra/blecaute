import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { SpotLight as BaseSpotLight } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { FLASHLIGHT_COLOR } from '../../../config'
import { GLTFGeometry } from '../GLTFGeometry'
import { DichromaticMaterial } from '../../materials/Dichromatic'

export function FlashLight({ target, z = 0 }: {
  target: React.RefObject<THREE.Vector3>
  z?: number
}): JSX.Element {
  const meshRef = useRef<THREE.Group>(null)
  const position = useMemo(() => new THREE.Vector3(0, 0, z), [])
  const lookAt = useMemo(() => new THREE.Vector3(0), [])

  useFrame(() => {
    const lightPosScale = 0.4
    if (!target.current) return
    lookAt.setX(target.current.x)
    lookAt.setY(target.current.y)
    position.setX(target.current.x * lightPosScale)
    position.setY(target.current.y * lightPosScale)

    meshRef.current?.lookAt(lookAt)
    meshRef.current?.position.copy(position)
  })

  return (
    <group
      ref={meshRef}
      position={[0,0,5]}
      scale={.25}
      >
      <mesh receiveShadow castShadow>
        <GLTFGeometry url={require('url:./geometry.gltf')} />
        <DichromaticMaterial {...FLASHLIGHT_COLOR} />
      </mesh>
    </group>
  )
}

export function SpotLight({ target, z = 0 }: {
  target?: React.RefObject<THREE.Vector3> | [number, number, number]
  z?: number
}): JSX.Element {
  const lightRef = useRef<THREE.SpotLight>(null)
  const three = useThree()
  const position = useMemo(() => new THREE.Vector3(0, 0, z), [])
  const lookAt = useMemo(() => new THREE.Vector3(0), [])

  useFrame(() => {
    if (!target || !('current' in target) || !target.current) return

    const lightPosScale = 0.4

    lookAt.setX(target.current.x)
    lookAt.setY(target.current.y)
    position.setX(target.current.x * lightPosScale)
    position.setY(target.current.y * lightPosScale)

    lightRef.current?.position.copy(position)
    lightRef.current?.target.position.copy(lookAt)
  })

  useEffect(() => {
    three.scene.add(lightRef.current!.target);
    if (target && !('current' in target))
      three.scene.lookAt(...target)
  }, [])

  return (
    <BaseSpotLight
      castShadow
      ref={lightRef}
      distance={20}
      intensity={.5}
      penumbra={0}
      decay={0}
      angle={.4}
      color={'red'}
      position={position}
    />
  )
}
