import React, { useEffect, useRef, useState } from 'react'
import { Text3D } from "@react-three/drei"
import font from './font.json'
import { DichromaticMaterial } from '../../materials/Dichromatic'
import { LOGO_COLOR } from '../../../config'
import * as THREE from 'three'

type LogoProps = {
  width: number
}

export function Logo({ width }: LogoProps): JSX.Element {
  const textRef = useRef<THREE.Mesh<THREE.BufferGeometry>>(null)
  const [size, setSize] = useState<[number, number]>([0, 0])
  useEffect(() => {
    if (!textRef.current) return
    const geometry = textRef.current?.geometry
    geometry.computeBoundingBox()
    setSize([
      geometry.boundingBox!.max.x + geometry.boundingBox!.min.x,
      geometry.boundingBox!.max.y + geometry.boundingBox!.min.y
    ])
    console.log(geometry.boundingBox)
  }, [])
  const visible = Boolean(size[0] && size[1])
  const scale = visible ? width / size[0] : 1
  return (
    <mesh visible={visible} scale={scale}>
      {/* <boxGeometry args={[...size, 1]} /> */}
      <Text3D
        ref={textRef}
        castShadow
        font={font as any}
        height={.5}
        position={[-size[0] / 2, -size[1] / 2, 0]}
      >
        BLECAUTE
        <DichromaticMaterial {...LOGO_COLOR} />
      </Text3D>
    </mesh>
  )
}