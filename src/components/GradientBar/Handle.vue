<script setup lang="ts">
import { computed, inject } from 'vue'
import { pickerContextProvide } from '../provide'
import { low, high } from '@//utils/formatters'
import type { GradientProps } from '@/shared/types'

const props = defineProps<{
  left?: number
  i: number
}>()

const emits = defineEmits<{
  setDragging: [boolean]
}>()

const { colors, selectedColor, squareWidth, defaultStyles, createGradientStr } = inject(pickerContextProvide)!

const isSelected = computed(() => selectedColor.value === props.i)
const leftMultiplyer = computed(() => (squareWidth.value - 18) / 100)

const setSelectedColor = (index: number) => {
  const newGradStr = colors.value?.map((cc: GradientProps, i: number) => ({
    ...cc,
    value: i === index ? high(cc) : low(cc)
  }))
  createGradientStr(newGradStr)
}

const handleDown = () => {
  setSelectedColor(props.i)
  emits('setDragging', true)
}
</script>

<template>
  <div
    :id="`gradient-handle-${i}`"
    @mousedown.stop="handleDown"
    :style="{
      ...defaultStyles.rbgcpGradientHandleWrap,
      left: (left || 0) * leftMultiplyer + 'px'
    }">
    <div
      :style="{
        ...defaultStyles.rbgcpGradientHandle,
        ...(isSelected ? { boxShadow: '0px 0px 5px 1px rgba(86, 140, 245,.95)', border: '2px solid white' } : {})
      }">
      <div v-show="isSelected" class="size-5px rounded-50% bg-white" />
    </div>
  </div>
</template>

<style scoped></style>
