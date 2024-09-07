<script setup lang="ts">
import { inject } from 'vue'
import { pickerContextProvide } from '../provide'
import Square from '../Square'
import Controls from '../Controls'
import type { LocalesProps } from '@/shared/types'
import GradientBar from '../GradientBar'
import Hue from '../Hue'
import Opacity from '../Opacity'
import Inputs from '../Inputs'
import Presets from '../Presets'

defineOptions({
  name: 'Picker'
})
export type PickerProps = {
  hideControls?: boolean
  hideInputs?: boolean
  hidePresets?: boolean
  hideOpacity?: boolean
  hideHue?: boolean
  presets?: string[]
  hideEyeDrop?: boolean
  hideAdvancedSliders?: boolean
  hideColorGuide?: boolean
  hideInputType?: boolean
  hideColorTypeBtns?: boolean
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
  hideGradientControls?: boolean
  locales?: LocalesProps
}
defineProps<PickerProps>()

const { isGradient } = inject(pickerContextProvide)!
</script>

<template>
  <div style="user-select: none" id="rbgcp-wrapper">
    <Square />
    <Controls
      v-if="!hideControls"
      :locales="locales"
      :hideEyeDrop="hideEyeDrop"
      :hideInputType="hideInputType"
      :hideColorGuide="hideColorGuide"
      :hideGradientType="hideGradientType"
      :hideGradientStop="hideGradientStop"
      :hideColorTypeBtns="hideColorTypeBtns"
      :hideGradientAngle="hideGradientAngle"
      :hideAdvancedSliders="hideAdvancedSliders"
      :hideGradientControls="hideGradientControls" />
    <GradientBar v-show="isGradient" />
    <Hue v-if="!hideHue" />
    <Opacity v-if="!hideOpacity" />
    <Inputs v-if="!hideInputs" />
    <Presets v-if="!hidePresets" />
  </div>
</template>

<style scoped></style>
