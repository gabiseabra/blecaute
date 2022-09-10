import { DichromaticMaterialProps } from './components/materials/Dichromatic'
import Chroma from 'chroma-js'

export const COLOR_SHADOW = '#000a94'
export const COLOR_LOGO = '#ff949f'
export const COLOR_BG = '#ff949f'

export const BG_COLOR: DichromaticMaterialProps = {
  ambient: COLOR_SHADOW,
  diffuse: COLOR_BG,
  contrast: 2.0
}

export const TEXT_COLOR: DichromaticMaterialProps = {
  ambient: COLOR_SHADOW,
  diffuse: COLOR_SHADOW
}

export const LOGO_COLOR: DichromaticMaterialProps = {
  ambient: Chroma.mix(COLOR_LOGO, COLOR_SHADOW, 0.65).hex(),
  // ambient: Chroma.blend(COLOR_LOGO, COLOR_SHADOW, 'screen').hex(),
  diffuse: COLOR_LOGO,
  contrast: 1.5
}