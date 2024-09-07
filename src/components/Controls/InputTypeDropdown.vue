<script setup lang="ts">
import { computed, inject } from 'vue'
import { pickerContextProvide } from '../provide'
import { modalBtnStyles } from '@/styles/styles'

const openInputType = defineModel<boolean>('openInputType')

const { inputType, setInputType, defaultStyles } = inject(pickerContextProvide)!

const vTrans = computed(() => (openInputType.value ? 'visibility 0ms linear' : 'visibility 100ms linear 150ms'))
const zTrans = computed(() => (openInputType.value ? 'z-index 0ms linear' : 'z-index 100ms linear 150ms'))
const oTrans = computed(() => (openInputType.value ? 'opacity 120ms linear' : 'opacity 150ms linear 50ms'))

const handleInputType = (val: string) => {
  if (openInputType.value) {
    setInputType(val)
    openInputType.value = false
  }
}
</script>

<template>
  <div
    :style="{
      visibility: openInputType ? 'visible' : 'hidden',
      zIndex: openInputType ? '' : -100,
      opacity: openInputType ? 1 : 0,
      transition: `${oTrans}, ${vTrans}, ${zTrans}`,
      ...defaultStyles.rbgcpColorModelDropdown
    }">
    <div @click.stop="handleInputType('rgb')" :style="modalBtnStyles(inputType === 'rgb', defaultStyles)">RGB</div>
    <div @click.stop="handleInputType('hsl')" :style="modalBtnStyles(inputType === 'hsl', defaultStyles)">HSL</div>
    <div @click.stop="handleInputType('hsv')" :style="modalBtnStyles(inputType === 'hsv', defaultStyles)">HSV</div>
    <div @click.stop="handleInputType('cmyk')" :style="modalBtnStyles(inputType === 'cmyk', defaultStyles)">CMYK</div>
  </div>
</template>

<style scoped></style>
