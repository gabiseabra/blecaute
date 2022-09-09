import React from 'react'

export function Background() {
  return (
    <mesh position={[0,0,-2]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshToonMaterial color={'hotpink'} />
    </mesh>
  )
}