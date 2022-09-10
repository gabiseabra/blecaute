import React from 'react'
import { Logo } from './Logo'
import { useDepthBuffer } from '@react-three/drei'
import { Background } from './Background'
import { Spotlight } from './Spotlight'
import { Flex, Box } from '@react-three/flex'
import Text from './Text'
export function Scene({}): JSX.Element {
  const depthBuffer = useDepthBuffer({ size: 256 })
  return (
    <>
      <ambientLight color={'red'} intensity={1} />
      {/* <ambientLight color={0x404040} intensity={1} /> */}
      <Spotlight />
      <mesh position={[-3,0,0]} castShadow>
        <Logo />
      </mesh>
      <Background>
        <Text textAlign='center'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a massa eget ipsum luctus hendrerit vitae nec elit. Fusce luctus tortor ligula, a porta augue vehicula ut.
        </Text>
      </Background>
    </>
  )
}
