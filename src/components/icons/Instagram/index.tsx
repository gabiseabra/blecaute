import React from 'react'
import { DichromaticMaterial } from '../../materials/Dichromatic'
import { Icon } from "../../objects/Icon"
import * as THREE from 'three'

export function InstagramIcon({scale, position, ...props}: {
  scale?: THREE.Vector3 | number
  position?: THREE.Vector3 | [number, number, number]
  width?: number
  height?: number
  depth?: number
}): JSX.Element {
  return (
    <mesh castShadow scale={scale} position={position}>
      <Icon url={require('url:./icon.stl')} {...props} />
      <DichromaticMaterial diffuse={0xffc869} contrast={2} />
    </mesh>
  )
}