import type { GradientProps, Styles } from '@/shared/types'
import type tinycolor from 'tinycolor2'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type PickerContextProps = {
  hc: Ref<tinycolor.ColorFormats.RGBA & tinycolor.ColorFormats.HSV>
  value: ComputedRef<string>
  colors: ComputedRef<GradientProps[]>
  degrees: ComputedRef<number>
  onChange: (arg0: string) => void
  inputType: Ref<string>
  tinyColor: ComputedRef<tinycolor.Instance>
  isGradient: ComputedRef<boolean>
  squareWidth: ComputedRef<number>
  hideOpacity: ComputedRef<boolean>
  currentLeft: ComputedRef<number>
  deletePoint: () => void
  squareHeight: ComputedRef<number>
  setInputType: (arg0: string) => void
  gradientType: ComputedRef<string>
  handleChange: (arg0: string) => void
  currentColor: ComputedRef<string>
  selectedColor: ComputedRef<number>
  setHc: (arg0: PickerContextProps['hc']['value']) => void
  handleGradient: (arg0: string, arg1?: number) => void
  createGradientStr: (arg0: GradientProps[]) => void
  defaultStyles: ComputedRef<Styles>
  previous: Ref<{
    color?: string
    gradient?: string
  }>
}
export const pickerContextProvide = Symbol() as InjectionKey<PickerContextProps>
