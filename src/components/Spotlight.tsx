import React, { useRef, useEffect } from 'react'
import { SpotLight, useHelper } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'


export function Spotlight({}): JSX.Element {
  const lightRef = useRef<THREE.SpotLight>(null)
  const three = useThree()
  // useHelper(lightRef, THREE.SpotLightHelper)

  useFrame(() => {
    const lightPosScale = 2 * three.viewport.aspect
    const targetPosScale = 4 * three.viewport.aspect
    lightRef.current?.position.setX(three.pointer.x * lightPosScale)
    lightRef.current?.position.setY(three.pointer.y * lightPosScale)
    lightRef.current?.target.position.setX(three.pointer.x * targetPosScale)
    lightRef.current?.target.position.setY(three.pointer.y * targetPosScale)
  })

  useEffect(() => {
    three.scene.add(lightRef.current!.target);
  }, [])

  return (
    <>
      <SpotLight
        ref={lightRef}
        distance={20}
        position={[0, 0, 5]}
        intensity={.5}
        penumbra={0}
        angle={.4}
        color="#ff005b"
        castShadow
      />
    </>
  )
}
