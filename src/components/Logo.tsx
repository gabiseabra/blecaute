import React from 'react'
import { Text3D } from "@react-three/drei"
import font from '../fonts/BLACAUTE.json'
import { DichromaticMaterial } from './materials/Dichromatic'
import { LOGO_COLOR } from '../config'

export function Logo() {
  return (
    <Text3D font={font as any} height={.5} castShadow>
      BLECAUTE
      <DichromaticMaterial {...LOGO_COLOR} />
    </Text3D>
  )
}