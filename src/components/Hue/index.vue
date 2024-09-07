<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { pickerContextProvide } from '../provide'
import usePaintHue from '@/hooks/usePaintHue'
import tinycolor from 'tinycolor2'
import { getHandleValue } from '@/utils/utils'

defineOptions({
  name: 'Hue'
})

const { handleChange, squareWidth, hc, setHc } = inject(pickerContextProvide)!
const barRef = ref<HTMLCanvasElement>()
const dragging = ref(false)

onMounted(() => {
  usePaintHue(barRef.value!, squareWidth)
})

const stopDragging = () => {
  dragging.value = false
}

const handleDown = () => {
  dragging.value = true
}

const handleHue = (e: any) => {
  requestAnimationFrame(() => {
    const newHue = getHandleValue(e) * 3.6
    const tinyHsv = tinycolor({ h: newHue, s: hc.value.s, v: hc.value.v })
    const { r, g, b } = tinyHsv.toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc.value.a})`)
    setHc({ ...hc.value, h: newHue })
  })
}

const handleMove = (e: any) => {
  if (dragging.value) {
    handleHue(e)
  }
}

const handleClick = (e: any) => {
  if (!dragging.value) {
    handleHue(e)
  }
}
const handleUp = () => {
  stopDragging()
}
onMounted(() => {
  window.addEventListener('mouseup', handleUp)
})

onUnmounted(() => {
  window.removeEventListener('mouseup', handleUp)
})
</script>

<template>
  <div class="h-14px mt-17px mb-4px cursor-ew-resize relative" @mousemove="handleMove">
    <div
      tabIndex="0"
      role="button"
      :style="{
        border: '2px solid white',
        borderRadius: '50%',
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
        width: '18px',
        height: '18px',
        zIndex: 1000,
        transition: 'all 10ms linear',
        position: 'absolute',
        left: 0,
        transform: `translateX(${hc?.h * ((squareWidth - 18) / 360)}px)`,
        top: -2 + 'px',
        cursor: 'ew-resize',
        boxSizing: 'border-box'
      }"
      @mousedown="handleDown" />
    <canvas ref="barRef" height="14px" :width="`${squareWidth}px`" @click="handleClick" class="relative rounded-14px align-top" />
  </div>
</template>

<style scoped></style>
