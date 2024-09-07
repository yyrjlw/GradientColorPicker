<script setup lang="ts">
import { inject } from 'vue'
import { pickerContextProvide } from '../provide'
import TrashIcon from '../icon'
import { high, low } from '@/utils/formatters'
import { controlBtnStyles } from '@/styles/styles'

const { colors, selectedColor, createGradientStr, defaultStyles } = inject(pickerContextProvide)!

const deletePoint = () => {
  if (colors.value?.length > 2) {
    const formatted = colors.value?.map((fc: any, i: number) => ({
      ...fc,
      value: i === selectedColor.value - 1 ? high(fc) : low(fc)
    }))
    const remaining = formatted?.filter((_: any, i: number) => i !== selectedColor.value)
    createGradientStr(remaining)
  }
}
</script>

<template>
  <div :style="{ ...controlBtnStyles(false, defaultStyles), width: 28 + 'px' }" id="rbgcp-point-delete-btn" :tabIndex="0" role="button" @click="deletePoint">
    <!-- onKeyDown={() => {
        return
      }} -->
    <TrashIcon />
  </div>
</template>

<style scoped></style>
