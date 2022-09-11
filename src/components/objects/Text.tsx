import React, { useMemo } from 'react'
import { useReflow } from '@react-three/flex'
import { Text as TextImpl } from '@react-three/drei'
import { DichromaticMaterial } from '../materials/Dichromatic'
import { FONT_CURSIVE, FONT_SIZE_LG, FONT_SIZE_MD, FONT_SIZE_SM, TEXT_COLOR } from '../../config'

type Props = Parameters<typeof TextImpl>[0] & {
  color?: string | number
  size?: number | "sm" | "md" | "lg"
}

const fontSize = (size: Props['size']): number | undefined => (
  size === "sm" ? FONT_SIZE_SM :
  size === "md" ? FONT_SIZE_MD :
  size === "lg" ? FONT_SIZE_LG :
  undefined
)

export default function Text({size, color, children, ...props}: Props) {
  const reflow = useReflow()
  const materialProps = useMemo(() => ({
    ...TEXT_COLOR,
    diffuse: color ?? TEXT_COLOR.diffuse
  }), [color])
  return (
      <TextImpl
        receiveShadow
        onSync={reflow}
        font={FONT_CURSIVE}
        anchorX="left"
        anchorY="top"
        textAlign="left"
        fontSize={fontSize(size)}
        onUpdate={(mesh) => mesh.geometry.computeBoundingBox()}
        {...props}
      >
        {children}
        <DichromaticMaterial {...materialProps} />
      </TextImpl>
  )
}
