import React from 'react'
import { INSTA_COLOR } from '../../../config'
import { DichromaticMaterial } from '../../materials/Dichromatic'
import { mkGLTFMesh } from '../../objects/GLTFGeometry'

export const InstagramIcon = mkGLTFMesh(require('url:./icon.gltf'))

InstagramIcon.defaultProps = {
  castShadow: true,
  children: <DichromaticMaterial {...INSTA_COLOR} />
}
