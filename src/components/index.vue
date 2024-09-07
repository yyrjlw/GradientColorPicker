<script setup lang="ts">
import { defaultLocales } from '@/constants'
import type { ColorPickerProps, GradientProps, Styles } from '@/shared/types'
import { getStyles } from '@/styles/styles'
import { getColors, high, low } from '@/utils/formatters'
import { getColorObj, getDetails, isUpperCase, objectToString } from '@/utils/utils'
import tinycolor from 'tinycolor2'
import { computed, provide, ref, watch } from 'vue'
import { pickerContextProvide, type PickerContextProps } from './provide'
import Picker from './Picker'

defineOptions({
  name: 'ColorPicker'
})
const props = withDefaults(defineProps<ColorPickerProps>(), {
  hideControls: false,
  hideInputs: false,
  hideOpacity: false,
  hidePresets: false,
  hideHue: false,
  presets: () => [],
  hideEyeDrop: false,
  hideAdvancedSliders: false,
  hideColorGuide: false,
  hideInputType: false,
  hideColorTypeBtns: false,
  hideGradientType: false,
  hideGradientAngle: false,
  hideGradientStop: false,
  hideGradientControls: false,
  locales: () => defaultLocales,
  width: 294,
  height: 294,
  style: () => ({}),
  disableDarkMode: false
})

const modelValue = defineModel<string>()
const safeValue = computed(() => objectToString(modelValue.value))
const defaultStyles = computed(() => getStyles(props.disableDarkMode))

const colors = computed(() => getColors(safeValue.value))
// const { degrees, degreeStr, isGradient, gradientType } = computed(()=>getDetails(safeValue.value))
const valueDetails = computed(() => getDetails(safeValue.value))
const degrees = computed(() => valueDetails.value.degrees)
const degreeStr = computed(() => valueDetails.value.degreeStr)
const isGradient = computed(() => valueDetails.value.isGradient)
const gradientType = computed(() => valueDetails.value.gradientType)
// const { currentColor, selectedColor, currentLeft } = computed(()=>getColorObj(colors.value))
const colorObj = computed(() => getColorObj(colors.value))
const currentColor = computed(() => colorObj.value.currentColor)
const selectedColor = computed(() => colorObj.value.selectedColor)
const currentLeft = computed(() => colorObj.value.currentLeft)

const inputType = ref('rgb')
const previous = ref({})
const tinyColor = computed(() => tinycolor(currentColor.value))
const rgba = computed(() => tinyColor.value.toRgb())
const hsv = computed(() => tinyColor.value.toHsv())
const hc = ref({ ...rgba.value, ...hsv.value })

watch(currentColor, () => {
  if (hsv.value?.s === 0) {
    hc.value = { ...rgba.value, ...hsv.value, h: hc.value?.h }
  } else {
    hc.value = { ...rgba.value, ...hsv.value }
  }
})

const createGradientStr = (newColors: GradientProps[]) => {
  const sorted = newColors.sort((a: GradientProps, b: GradientProps) => a.left - b.left)
  const colorString = sorted?.map((cc: any) => `${cc?.value} ${cc.left}%`)
  const newGrade = `${gradientType.value}(${degreeStr.value}, ${colorString.join(', ')})`
  previous.value = { ...previous.value, gradient: newGrade }
  modelValue.value = newGrade
}

const handleGradient = (newColor: string, left?: number) => {
  const remaining = colors.value?.filter((c: GradientProps) => !isUpperCase(c.value))
  const newColors = [{ value: newColor.toUpperCase(), left: left ?? currentLeft.value }, ...remaining]
  createGradientStr(newColors)
}

const handleChange = (newColor: string) => {
  if (isGradient.value) {
    handleGradient(newColor)
  } else {
    previous.value = { ...previous.value, color: newColor }
    modelValue.value = newColor
  }
}

const deletePoint = () => {
  if (colors.value?.length > 2) {
    const formatted = colors.value?.map((fc: GradientProps, i: number) => ({
      ...fc,
      value: i === selectedColor.value - 1 ? high(fc) : low(fc)
    }))
    const remaining = formatted?.filter((_: any, i: number) => i !== selectedColor.value)
    createGradientStr(remaining)
  }
}

const pickerContext: PickerContextProps = {
  hc,
  value: safeValue,
  colors,
  degrees,
  onChange(v) {
    modelValue.value = v
  },
  inputType,
  tinyColor,
  isGradient,
  squareWidth: computed(() => props.width),
  hideOpacity: computed(() => props.hideOpacity),
  currentLeft,
  deletePoint,
  squareHeight: computed(() => props.height),
  setInputType(v: typeof inputType.value) {
    inputType.value = v
  },
  gradientType,
  handleChange,
  currentColor,
  selectedColor,
  setHc(v: typeof hc.value) {
    hc.value = v
  },
  handleGradient,
  createGradientStr,
  defaultStyles,
  previous
}
provide(pickerContextProvide, pickerContext)
</script>

<template>
  <div :style="{ ...defaultStyles.body, ...style, width: width + 'px' }">
    <Picker
      :hideControls="hideControls"
      :hideInputs="hideInputs"
      :hidePresets="hidePresets"
      :hideOpacity="hideOpacity"
      :hideHue="hideHue"
      :presets="presets"
      :hideEyeDrop="hideEyeDrop"
      :hideAdvancedSliders="hideAdvancedSliders"
      :hideColorGuide="hideColorGuide"
      :hideInputType="hideInputType"
      :hideColorTypeBtns="hideColorTypeBtns"
      :hideGradientType="hideGradientType"
      :hideGradientAngle="hideGradientAngle"
      :hideGradientStop="hideGradientStop"
      :hideGradientControls="hideGradientControls"
      :locales="locales" />
  </div>
</template>

<style scoped></style>
