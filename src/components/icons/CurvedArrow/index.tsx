import React from 'react'
import { DichromaticMaterial } from '../../materials/Dichromatic'
import { Icon } from "../../objects/Icon"
import * as THREE from 'three'

export function CurvedArrowIcon({
  scale,
  position,
  rotation,
  ...props
}: {
  scale?: THREE.Vector3 | [number, number, number] | number
  position?: THREE.Vector3 | [number, number, number]
  rotation?: THREE.Euler
  width?: number
  height?: number
  depth?: number
}): JSX.Element {
  return (
    <mesh castShadow scale={scale} position={position} rotation={rotation}>
      <Icon url={require('url:./icon.stl')} {...props} />
      <DichromaticMaterial contrast={2} />
    </mesh>
  )
}