import React, { useMemo } from 'react'
import fragmentShader from './Dichromatic.frag'
import * as THREE from 'three'

export type DichromaticMaterialProps = {
  ambient: number | string
  diffuse: number | string
  contrast?: number
}

export function DichromaticMaterial(props: DichromaticMaterialProps): JSX.Element {
  const uniforms = useMemo(() => ({
      ambient: { value: new THREE.Color(props.ambient) },
      uContrast: { value: props.contrast ?? 1.0 },
  }), [])
  return (
    <meshToonMaterial
      color={props.diffuse}
      onBeforeCompile={(shader) => {
        shader.fragmentShader = fragmentShader
        Object.assign(shader.uniforms, uniforms)
      }}
    />
  )
}
