<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { pickerContextProvide } from '../provide'
import { getHandleValue } from '@/utils/utils'
import { low } from '@//utils/formatters'
import Handle from './Handle.vue'

defineOptions({
  name: 'GradientBar'
})

const { currentColor, createGradientStr, colors, value, handleGradient, squareWidth } = inject(pickerContextProvide)!

const dragging = ref(false)

function force90degLinear(color: string) {
  return color.replace(/(radial|linear)-gradient\([^,]+,/, 'linear-gradient(90deg,')
}

const addPoint = (e: any) => {
  const left = getHandleValue(e)
  const newColors = [...colors.value.map((c: any) => ({ ...c, value: low(c) })), { value: currentColor.value, left: left }]?.sort((a, b) => a.left - b.left)
  createGradientStr(newColors)
}

const stopDragging = () => {
  dragging.value = false
}

const handleDown = (e: any) => {
  if (dragging.value) return
  addPoint(e)
  dragging.value = true
}

const handleMove = (e: any) => {
  if (dragging.value) handleGradient(currentColor.value, getHandleValue(e))
}

const handleUp = () => {
  stopDragging()
}

onMounted(() => {
  window.addEventListener('mouseup', handleUp)
})

onUnmounted(() => window.removeEventListener('mouseup', handleUp))
</script>

<template>
  <div class="w-full mt-17px mb-4px relative" id="gradient-bar">
    <div
      class="h-14px rounded-10px"
      :style="{
        width: squareWidth,
        backgroundImage: force90degLinear(value)
      }"
      @mousedown="handleDown"
      @mousemove="handleMove" />
    <Handle v-for="(c, i) in colors" :i="i" :left="c.left" :key="`${i}-${c}`" @setDragging="dragging = $event" />
  </div>
</template>

<style scoped></style>
