import { DichromaticMaterialProps } from './components/materials/Dichromatic'
import Chroma from 'chroma-js'
import { useThree } from 'react-three-fiber'

type Breakpoint = "sm" | "md" | "lg"

export const getBreakpoint = (width: number): Breakpoint => (
  width <= 576 ? 'sm' : width <= 768 ? 'md' : 'lg'
)

export const mapBreakpoint = <A>(map: { [k in Breakpoint]: A }, width: number): A => map[getBreakpoint(width)]

export function useBreakpoint() {
  const { size } = useThree()
  return getBreakpoint(size.width)
}

export const COLOR_SHADOW = '#000a94'
export const COLOR_LOGO = '#ff949f'
export const COLOR_BG = '#ff949f'

export const FONT_CURSIVE: string = require('url:./fonts/LongCang-Regular.ttf')

export const FONT_SIZE_SM = 0.2
export const FONT_SIZE_MD = 0.4
export const FONT_SIZE_LG = 0.6

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
