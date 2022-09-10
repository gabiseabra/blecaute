import React from 'react'
import { useReflow } from '@react-three/flex'
import { Text as TextImpl } from '@react-three/drei'
import { DichromaticMaterial } from './materials/Dichromatic'
import { FONT_CURSIVE, TEXT_COLOR } from '../config'
import { useMemo } from 'react'

type Props = Parameters<typeof TextImpl>[0] & {
  color?: string | number
}

export default function Text({color, children, ...props}: Props) {
  // const reflow = useReflow()
  const materialProps = useMemo(() => ({
    ...TEXT_COLOR,
    diffuse: color ?? TEXT_COLOR.diffuse
  }), [color])
  return (
      <TextImpl
        // onSync={reflow}
        font={FONT_CURSIVE}
        anchorX="left"
        anchorY="top"
        textAlign="left"
        receiveShadow
        {...props}
      >
        {children}
        <DichromaticMaterial {...materialProps} />
      </TextImpl>
  )
}
