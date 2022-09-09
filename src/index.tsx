import React from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { StereoCamera } from 'three'


const camera = new StereoCamera(

)

createRoot(document.getElementById('root') as HTMLElement).render(
  <Canvas shadows>
    <PerspectiveCamera makeDefault position={[0,0,10]} fov={45} />
    <Scene />
    {/* <OrbitControls /> */}
  </Canvas>
)
