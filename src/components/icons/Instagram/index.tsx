import React from 'react'
import { DichromaticMaterial } from '../../materials/Dichromatic'
import { STLGeometry } from "../../objects/STLGeometry"
import * as THREE from 'three'
import { INSTA_COLOR } from '../../../config'

export function InstagramIcon({scale, position, onUpdate, ...props}: {
  scale?: THREE.Vector3 | number
  position?: THREE.Vector3 | [number, number, number]
  width?: number
  height?: number
  depth?: number
  onUpdate?: (_: THREE.Mesh) => void
}): JSX.Element {
  return (
    <mesh castShadow scale={scale} position={position} onUpdate={onUpdate}>
      <STLGeometry url={require('url:./icon.stl')} {...props} />
      <DichromaticMaterial {...INSTA_COLOR} />
    </mesh>
  )
}