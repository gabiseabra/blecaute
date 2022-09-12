import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { SpotLight } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { FLASHLIGHT_COLOR } from '../../../config'
import { STLGeometry } from '../STLGeometry'

const meshRotation = new THREE.Euler(0,1.58,.73)

export function FlashLight({ target }: {
  target: React.RefObject<THREE.Vector3>
}): JSX.Element {
  const meshRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.SpotLight>(null)
  const three = useThree()
  const position = useMemo(() => new THREE.Vector3(0, 0, 5), [])
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
    lightRef.current?.position.copy(position)
    lightRef.current?.target.position.copy(lookAt)
  })

  useEffect(() => {
    three.scene.add(lightRef.current!.target);    
  }, [])

  return (
    <>
      <group
        ref={meshRef}
        position={[0,0,5]}
        scale={[.5,.5,-.5]}
        >
        <mesh rotation={meshRotation} position={[0,-.68, 0]}>
          <STLGeometry url={require('url:./geometry.stl')} />
          <meshBasicMaterial {...FLASHLIGHT_COLOR} />
        </mesh>
      </group>
      <SpotLight
        castShadow
        ref={lightRef}
        distance={20}
        intensity={.5}
        penumbra={0}
        decay={0}
        angle={.4}
        color={'red'}
        position={[0,0,5]}
      />
    </>
  )
}
