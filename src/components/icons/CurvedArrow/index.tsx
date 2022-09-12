import React from 'react'
import { DichromaticMaterial } from '../../materials/Dichromatic'
import { mkGLTFMesh } from '../../objects/GLTFGeometry'

export const CurvedArrowIcon = mkGLTFMesh(require('url:./icon.gltf'))

CurvedArrowIcon.defaultProps = {
  castShadow: true,
  children: <DichromaticMaterial contrast={2} />
}
