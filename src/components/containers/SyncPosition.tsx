import React, { useMemo } from 'react'
import { RootState, Size, useThree } from 'react-three-fiber'
import * as THREE from 'three'


function projectSize(
  v3: THREE.Vector3,
  { camera, size, viewport }: RootState
): void {
  v3.x = Math.round(v3.x * (size.width / viewport.width));
  v3.y = Math.round(v3.y * (size.height / viewport.height));
}

function projectCoord(
  v3: THREE.Vector3,
  { camera, size: { width, height } }: RootState
): void {
  v3.project( camera );
  v3.x = Math.round(( v3.x + 1 ) * width / 2 );
  v3.y = Math.round(( 1 - v3.y ) * height / 2 );
}

function getCoordinates(
  mesh: THREE.Mesh,
  camera: THREE.Camera,
  { width, height }: Size
): THREE.Vector3 {
  const v3 = new THREE.Vector3();

  mesh.localToWorld( v3 );

  v3.project( camera );

  v3.x = Math.round(( v3.x + 1 ) * width / 2 );
  v3.y = Math.round(( 1 - v3.y ) * height / 2 );

  return v3
}

export function SyncPosition({ at, children }: {
  at: string,
  children: (onUpdate: (_: THREE.Mesh<THREE.BufferGeometry>) => void) => React.ReactNode
}): JSX.Element {
  const three = useThree()
  const element = useMemo(() => document.querySelector(at)! as HTMLElement, [at])
  return (
    <>
    {children((mesh) => {
      const pos = new THREE.Vector3(0)
      const box = new THREE.Vector3(0)
      const scale = new THREE.Vector3(0)

      if (!mesh.geometry.boundingBox)
        mesh.geometry.computeBoundingBox()
  
      mesh.geometry.boundingBox!.getSize(box)
      mesh.localToWorld(pos)
      mesh.getWorldScale(scale)

      box.multiply(scale)

      projectSize(box, three)
      projectCoord(pos, three)
      element.style.width = `${box.x}px`
      element.style.height = `${box.y}px`
      element.style.left = `${pos.x}px`
      element.style.bottom = `${three.size.height - pos.y}px`
    })}
    </>
  )
}