import React, { useEffect, useMemo, useRef } from 'react'
import { Flex, Box } from '@react-three/flex'
import { Size, useThree } from '@react-three/fiber'
import { Logo } from './Logo'
import Text from './Text'
import { DichromaticMaterial } from './materials/Dichromatic'
import { mapBreakpoint } from '../config'
import * as THREE from 'three'

const topRow = (size: Size) => (rowWidth: number): JSX.Element => {
  const colWidth = rowWidth * mapBreakpoint({
    sm: 1,
    md: 1,
    lg: 0.5,
  }, size.width)
  const colHeight = mapBreakpoint({
    sm: 3,
    md: 2,
    lg: 2,
  }, size.width)
  return (
    <Box
      centerAnchor
      width={colWidth}
      height={colHeight}
    >
      {() => (
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
          consectetur adipiscing elit
        </Text>
      )}
    </Box>
  )
}

const bottomRow = (rowWidth: number, rowHeight: number) => {
  return <></>
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
        pb={.5}
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
        centerAnchor
        width="100%"
        height="50%"
        shrink={1}
        dir="row"
        align="flex-end"
        justify="flex-start"
      >
        {bottomRow}
      </Box>
    </Flex>
  )
}
