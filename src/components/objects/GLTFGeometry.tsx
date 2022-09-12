
import React, { useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshProps } from '@react-three/fiber'

type GLTFGeometryProps = {
  url: string
  width?: number
  height?: number
  depth?: number
}

export type GLTFResult = GLTF & {
  nodes: { [k in string]: THREE.Mesh }
  materials: {}
}

const normalizeGeometry = (
  baseGeom: THREE.BufferGeometry,
  width: number,
  height: number,
  depth: number,
): THREE.BufferGeometry => {
  baseGeom.computeBoundingBox()
  const size = new THREE.Vector3(0)
  baseGeom.boundingBox?.getSize(size)
  const scale = new THREE.Vector3(1, 1, 1).divide(size)
  const geom = baseGeom
    .clone()
    .scale(scale.x, scale.x, scale.x)
    .scale(width, height, depth)
  return geom
}

const filterObject = <K extends string, V>(
  obj: Record<K, V>,
  fn: (v: V) => boolean
): Record<K, V> => (
  (Object.keys(obj) as K[]).reduce((acc, k) => {
    if (fn(obj[k])) { acc[k] = obj[k] }
    return acc
  }, {} as Record<K, V>)
)

const isMesh = (x: unknown): x is THREE.Mesh => Boolean(x) && x instanceof THREE.Mesh && x.type === 'Mesh'

export function GLTFGeometry({
  url,
  width = 1,
  height = 1,
  depth = 1
}: GLTFGeometryProps): JSX.Element {
  const { nodes } = useGLTF(url) as GLTFResult
  const geom = useMemo(() => (
    Object
      .entries(filterObject(nodes, isMesh))
      .map(([key, mesh]) => [key, normalizeGeometry(
        mesh.geometry,
        width,
        height,
        depth
      )])
  ), [nodes])
  console.log(geom)
  
  return (
    <>
        <primitive object={geom[0][1]} attach="geometry" />
      {/* {geom.map(([k, v]) => (
        <primitive key={k} object={v} attach="geometry" />
      ))} */}
    </>
  )
}

type GLTFMeshProps
  = Omit<MeshProps, keyof GLTFGeometryProps | "children">
  & Omit<GLTFGeometryProps, "url">
  & {
    children?: React.ReactNode
  }

export const mkGLTFMesh = <Props = GLTFMeshProps>(
  url: string,
  mapProps?: ((_: Props) => GLTFMeshProps)
): React.FC<Props> => {
  function GLTFMesh(props: Props): JSX.Element {
    const {
      children,
      width,
      height,
      depth,
      ...meshProps  
    } = mapProps?.(props) ?? props as GLTFMeshProps
    return (
      <mesh {...meshProps}>
        <GLTFGeometry
          url={url}
          width={width}
          height={height}
          depth={depth}
        />
        {children}
      </mesh>
    )
  }
  GLTFMesh.name = `GLTFMesh(${url})`
  useGLTF.preload(url)
  return GLTFMesh
}
