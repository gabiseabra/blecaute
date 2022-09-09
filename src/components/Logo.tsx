import React from 'react'
import { Text3D } from "@react-three/drei"
import font from '../fonts/BLACAUTE.json'

export function Logo() {
  return (
    <Text3D font={font as any} height={.5} castShadow>
      BLECAUTE
      <meshToonMaterial color={'grey'} emissiveIntensity={.051} emissive={'hotpink'} />
      {/* <meshNormalMaterial /> */}
    </Text3D>
  )
}