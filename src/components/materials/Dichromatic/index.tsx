import React, { useMemo } from 'react'
import fragmentShader from './Dichromatic.frag'
import * as THREE from 'three'
import { COLOR_SHADOW } from '../../../config'

export type DichromaticMaterialProps = {
  ambient?: number | string
  diffuse?: number | string
  contrast?: number
}

export function DichromaticMaterial(props: DichromaticMaterialProps): JSX.Element {
  const uniforms = useMemo(() => ({
      ambient: { value: new THREE.Color(props.ambient ?? COLOR_SHADOW) },
      uContrast: { value: props.contrast ?? 1.0 },
  }), [])
  return (
    <meshToonMaterial
      color={props.diffuse ?? COLOR_SHADOW}
      onBeforeCompile={(shader) => {
        shader.fragmentShader = fragmentShader
        Object.assign(shader.uniforms, uniforms)
      }}
    />
  )
}
