import React, { useRef } from 'react'
import { Flex, Box } from '@react-three/flex'
import { Size, useThree } from '@react-three/fiber'
import { Logo } from '../objects/Logo'
import Text from '../objects/Text'
import { mapBreakpoint } from '../../config'
import { InstagramIcon } from '../icons/Instagram'
import { CurvedArrowIcon } from '../icons/CurvedArrow'
import * as THREE from 'three'

const topRow = (size: Size) => (rowWidth: number): JSX.Element => {
  const colWidth = rowWidth * mapBreakpoint({
    sm: 1,
    lg: 0.5,
  }, size)
  const colHeight = mapBreakpoint({
    sm: 3,
    lg: 3,
  }, size)
  return (
    <Box
      centerAnchor
      width={colWidth}
      height={colHeight}
    >
      <Text
        size="md"
        maxWidth={colWidth}
        textAlign="center"
        position={[
          -colWidth / 2,
          colHeight / 2,
          0.0001
        ]}
      >
        Lorem ipsum dolor sit amet,
        consectetur adipiscing elit
        consectetur adipiscing elit
        consectetur adipiscing elit
      </Text>
    </Box>
  )
}

const bottomRow = (rowWidth: number, rowHeight: number) => <></>

const curvedArrowRotation = new THREE.Euler(0,0,1.5)
const contactTextRotation = new THREE.Euler(0,0,0.12)

const contactRow = (size: Size) => (rowWidth: number, rowHeight: number) => {
  const iconSize = mapBreakpoint({
    sm: .5,
    lg: .75
  }, size)
  const textSize = mapBreakpoint({
    sm: 'sm',
    lg: 'md'
  }, size) as 'sm' | 'md' | 'lg'
  const contactPosition: [number, number, number] = mapBreakpoint({
    sm: [1.3, 1.2, 0],
    lg: [2.2, 1.5, 0],
  }, size)
  const contactScale = mapBreakpoint({
    sm: .8,
    lg: 1
  }, size)
  return (
    <>
      <InstagramIcon scale={iconSize} depth={0.1} />
      <Text size={textSize} position={[iconSize + .5, iconSize *.7, 0]}>
        contato@blecaute.tv
      </Text>
      <group position={contactPosition} scale={contactScale}>
        <Text
          size="md"
          position={[0, .15, 0]}
          rotation={contactTextRotation}
        >
          Fale conosco
        </Text>
        <CurvedArrowIcon
          scale={[-.75, .75, .75]}
          rotation={curvedArrowRotation}
          position={[2.3, 0, 0]}
          depth={0.00001}
        />
      </group>
    </>
  )
}

export function LandingPage({}): JSX.Element {
  const { viewport, size } = useThree()
  const flexRef = useRef(null)
  return (
    <Flex
      ref={flexRef}
      size={[viewport.width, viewport.height, 0]}
      position={[
        -viewport.width / 2,
        viewport.height / 2,
        0
      ]}
      dir="column"
      align="center"
    >
      <Box
        width="100%"
        maxWidth={9}
        height="50%"
        shrink={1}
        dir="row"
        align="flex-end"
        justify="flex-end"
      >
        {topRow(size)}
      </Box>
      <Box centerAnchor width="100%" maxWidth={6} basis={1}>
        {(width: number) => <Logo width={width} />}
      </Box>
      <Box
        width="100%"
        height="50%"
        shrink={1}
        dir="column"
        align="stretch"
        justify="space-between"
      >
        <Box
          width="100%"
          height={1}
          dir="row"
          align="flex-end"
          justify="flex-start"
        >
          {bottomRow}
        </Box>
        <Box
          width="100%"
          height={.5}
          dir="row"
          align="center"
          justify="flex-start"
        >
          {contactRow(size)}
        </Box>
      </Box>
    </Flex>
  )
}
