import { DichromaticMaterialProps } from './components/materials/Dichromatic'
import Chroma from 'chroma-js'
import { Size, useThree } from 'react-three-fiber'

type Breakpoint = "sm" | "lg"

export const getBreakpoint = ({width, height}: Size): Breakpoint => {
  const aspect = width / height
  return (aspect <= .75 ? 'sm' : 'lg')
}

export const mapBreakpoint = <A>(map: { [k in Breakpoint]: A }, size: Size): A => map[getBreakpoint(size)]

export function useBreakpoint() {
  const { size } = useThree()
  return getBreakpoint(size)
}

export const MAIN_TEXT = `
Lorem ipsum dolor sit amet,
consectetur adipiscing elit
consectetur adipiscing elit
consectetur adipiscing elit
`
export const COLOR_SHADOW = '#000a94'
export const COLOR_LOGO = '#ff949f'
export const COLOR_BG = '#ff949f'

export const FONT_CURSIVE: string = require('url:./fonts/LongCang-Regular.ttf')

export const FONT_SIZE_SM = 0.25
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

export const INSTA_COLOR: DichromaticMaterialProps = {
  ambient: COLOR_SHADOW,
  diffuse: 0xffc869,
  contrast: 2
}
