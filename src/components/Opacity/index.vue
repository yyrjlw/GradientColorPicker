<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { pickerContextProvide } from '../provide'
import { getHandleValue } from '@/utils/utils'

defineOptions({
  name: 'Opacity'
})

const { handleChange, hc, squareWidth, defaultStyles } = inject(pickerContextProvide)!
const dragging = ref(false)
const bg = computed(() => `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${hc.value.r},${hc.value.g},${hc.value.b},.5) 100%)`)

const stopDragging = () => {
  dragging.value = false
}

const handleDown = () => {
  dragging.value = true
}

const handleOpacity = (e: any) => {
  requestAnimationFrame(() => {
    const newO = getHandleValue(e) / 100
    const { r, g, b } = hc.value
    const newColor = `rgba(${r}, ${g}, ${b}, ${newO})`
    handleChange(newColor)
  })
}

const handleMove = (e: any) => {
  if (dragging.value) {
    handleOpacity(e)
  }
}

const handleClick = (e: any) => {
  if (!dragging.value) {
    handleOpacity(e)
  }
}

const left = computed(() => squareWidth.value - 18)

const handleUp = () => {
  stopDragging()
}

onMounted(() => {
  window.addEventListener('mouseup', handleUp)
})

onUnmounted(() => window.removeEventListener('mouseup', handleUp))
</script>

<template>
  <div class="h-14px mt-17px mb-4px cursor-ew-resize relative" @mousedown="handleDown" @mousemove="handleMove">
    <div :style="{ ...defaultStyles.rbgcpCheckered, width: '100%', height: 14 + 'px' }" />
    <div :style="{ ...defaultStyles.rbgcpHandle, left: left * hc.a + 'px', top: -2 + 'px' }" />
    <div :style="{ ...defaultStyles.rbgcpOpacityOverlay, background: bg }" @click="handleClick" />
  </div>
</template>

<style scoped></style>
