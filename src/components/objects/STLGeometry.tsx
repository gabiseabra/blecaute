
import React, { useMemo } from 'react'
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { STLLoader } from '../../lib/STLLoader'

type IconProps = {
  url: string
  width?: number
  height?: number
  depth?: number
}

export function STLGeometry({url, width = 1, height = 1, depth = 1}: IconProps): JSX.Element {
  const [baseGeom] = useLoader<THREE.BufferGeometry, string[]>(STLLoader, [url])
  const geom = useMemo(() => {
    baseGeom.computeBoundingBox()
    const size = new THREE.Vector3(0)
    baseGeom.boundingBox?.getSize(size)
    const scale = new THREE.Vector3(1, 1, 1).divide(size)
    const geom = baseGeom
      .clone()
      .scale(scale.x, scale.x, scale.x)
      .scale(width, height, depth)
    return geom
  }, [baseGeom])
  return (
    <primitive object={geom} attach="geometry" />
  )
}
