import React, { useRef, useEffect, RefObject } from 'react'
import { SpotLight } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type SpotlightProps = {
  target: RefObject<THREE.Vector3>
}

export function Spotlight({ target }: SpotlightProps): JSX.Element {
  const lightRef = useRef<THREE.SpotLight>(null)
  const three = useThree()

  useFrame(() => {
    const lightPosScale = 0.2
    if (!target.current) return
    lightRef.current?.position.setX(target.current.x * lightPosScale)
    lightRef.current?.position.setY(target.current.y * lightPosScale)
    lightRef.current?.target.position.copy(target.current)
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
        decay={0}
        angle={.4}
        color={'red'}
        castShadow
      />
    </>
  )
}
