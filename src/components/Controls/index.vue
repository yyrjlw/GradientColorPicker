<script setup lang="ts">
import { config } from '@/constants'
import type { LocalesProps } from '@/shared/types'
import { computed, inject, ref } from 'vue'
import { pickerContextProvide } from '../provide'
import GradientControls from '../GradientControls'
import ColorTypeBtns from './ColorTypeBtns.vue'
import EyeDropper from '../EyeDropper'
import InputTypeDropdown from './InputTypeDropdown.vue'
import { colorTypeBtnStyles, controlBtnStyles, modalBtnStyles } from '@/styles/styles'
import { SlidersIcon, InputsIcon, PaletteIcon } from '@/components/icon'
import AdvancedControls from '../AdvancedControls'
import ComparibleColors from '../ComparibleColors'

defineOptions({
  name: 'Controls'
})

const { defaultColor, defaultGradient } = config

export type ControlsPropsType = {
  locales?: LocalesProps
  hideEyeDrop?: boolean
  hideAdvancedSliders?: boolean
  hideColorGuide?: boolean
  hideInputType?: boolean
  hideColorTypeBtns?: boolean
  hideGradientControls?: boolean
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
}
const props = withDefaults(defineProps<ControlsPropsType>(), {
  hideEyeDrop: false,
  hideAdvancedSliders: false,
  hideColorGuide: false,
  hideInputType: false,
  hideColorTypeBtns: false,
  hideGradientControls: false,
  hideGradientType: false,
  hideGradientAngle: false,
  hideGradientStop: false
})

const { onChange, isGradient, handleChange, previous, defaultStyles } = inject(pickerContextProvide)!

const openComparibles = ref(false)
const openInputType = ref(false)
const openAdvanced = ref(false)

const noTools = computed(() => props.hideEyeDrop && props.hideAdvancedSliders && props.hideColorGuide && props.hideInputType)

const setSolid = () => {
  onChange(previous.value?.color || defaultColor)
}

const setGradient = () => {
  onChange(previous.value?.gradient || defaultGradient)
}

const allRightControlsHidden = computed(() => props.hideEyeDrop && props.hideAdvancedSliders && props.hideColorGuide && props.hideInputType)
const allControlsHidden = computed(() => allRightControlsHidden.value && props.hideColorTypeBtns)
</script>

<template>
  <template v-if="allControlsHidden">
    <GradientControls v-show="isGradient && !hideGradientControls" :hideGradientType="hideGradientType" :hideGradientAngle="hideGradientAngle" :hideGradientStop="hideGradientStop" />
  </template>
  <div v-else class="pt-12px pb-4px">
    <div class="w-full flex items-center justify-between">
      <ColorTypeBtns :hideColorTypeBtns="hideColorTypeBtns" :setGradient="setGradient" :isGradient="isGradient" :setSolid="setSolid" :locales="locales" />

      <div
        v-show="!allRightControlsHidden"
        :style="{
          display: noTools ? 'none' : '',
          ...defaultStyles.rbgcpControlBtnWrapper
        }">
        <EyeDropper v-show="!hideEyeDrop" @select="handleChange" />
        <div
          id="rbgcp-advanced-btn"
          :style="{
            display: hideAdvancedSliders ? 'none' : 'flex',
            ...controlBtnStyles(openAdvanced, defaultStyles)
          }"
          @click="openAdvanced = !openAdvanced">
          <SlidersIcon :color="openAdvanced ? '#568CF5' : ''" />
        </div>
        <div
          id="rbgcp-comparibles-btn"
          :style="{
            display: hideColorGuide ? 'none' : 'flex',
            ...controlBtnStyles(openComparibles, defaultStyles)
          }"
          @click="openComparibles = !openComparibles">
          <PaletteIcon :color="openComparibles ? '#568CF5' : ''" />
        </div>
        <div
          id="rbgcp-color-model-btn"
          :style="{
            display: hideInputType ? 'none' : 'flex',
            ...controlBtnStyles(openInputType, defaultStyles)
          }"
          @click="openInputType = !openInputType">
          <InputsIcon :color="openInputType ? '#568CF5' : ''" />
          <InputTypeDropdown v-model:openInputType="openInputType" />
        </div>
      </div>
    </div>
    <AdvancedControls v-if="!hideAdvancedSliders" :openAdvanced="openAdvanced" />
    <ComparibleColors v-if="!hideColorGuide" :openComparibles="openComparibles" />
    <GradientControls v-show="isGradient && !hideGradientControls" :hideGradientType="hideGradientType" :hideGradientAngle="hideGradientAngle" :hideGradientStop="hideGradientStop" />
  </div>
</template>

<style scoped></style>
