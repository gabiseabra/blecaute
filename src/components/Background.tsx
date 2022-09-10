import React from 'react'
import { BG_COLOR } from '../config'
import { DichromaticMaterial } from './materials/Dichromatic'

type Props = {
  children?: React.ReactNode
}

export function Background({children}: Props) {
  return (
    <group position={[0,0,-1]}>
      <mesh receiveShadow position={[0,0,-.0001]}>
        <planeGeometry args={[100,100]} />
        <DichromaticMaterial {...BG_COLOR} />
      </mesh>
      {children}
    </group>
  )
}