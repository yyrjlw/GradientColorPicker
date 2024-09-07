<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { pickerContextProvide } from '../provide'
import { computePickerPosition, computeSquareXY } from '@/utils/utils'
import usePaintSquare from '@/hooks/usePaintSquare'
import { throttle } from 'lodash-es'
import { config } from '@/constants'
import tinycolor from 'tinycolor2'

defineOptions({
  name: 'Square'
})

const { hc, defaultStyles, squareWidth, squareHeight, handleChange } = inject(pickerContextProvide)!

const dragging = ref(false)
const setDragging = (val: boolean) => {
  dragging.value = val
}
const canvas = ref<HTMLCanvasElement>()
const squareXY = computed(() => computeSquareXY(hc.value?.s, hc.value?.v * 100, squareWidth.value, squareHeight.value))
const dragPos = ref({ x: squareXY.value[0], y: squareXY.value[1] })
const setDragPos = (v: { x: number; y: number }) => {
  dragPos.value = v
}

usePaintSquare(canvas, () => hc.value?.h, squareWidth, squareHeight)

watch(squareXY, () => {
  if (!dragging.value) {
    const [x, y] = squareXY.value
    setDragPos({ x: hc.value?.v === 0 ? dragPos.value.x : x, y })
  }
})

const { crossSize } = config

const handleColor = (e: any) => {
  const onMouseMove = throttle(() => {
    const [x, y] = computePickerPosition(e)
    if (x && y) {
      const x1 = Math.min(x + crossSize / 2, squareWidth.value - 1)
      const y1 = Math.min(y + crossSize / 2, squareHeight.value - 1)
      const newS = (x1 / squareWidth.value) * 100
      const newY = 100 - (y1 / squareHeight.value) * 100
      setDragPos({ x: newY === 0 ? dragPos.value?.x : x, y })
      const updated = tinycolor(`hsva(${hc.value?.h}, ${newS}%, ${newY}%, ${hc.value?.a})`)
      handleChange(updated.toRgbString())
    }
  }, 250)

  onMouseMove()
}

const stopDragging = () => {
  setDragging(false)
}

const handleMove = (e: any) => {
  if (dragging.value) {
    handleColor(e)
  }
}

// const handleTouchMove = (e: any) => {
//   if (dragging && isMobile) {
//     document.body.style.overflow = 'hidden'
//     handleColor(e)
//   }
// }

const handleClick = (e: any) => {
  if (!dragging.value) {
    handleColor(e)
  }
}

const handleMouseDown = () => {
  setDragging(true)
}

const handleCanvasDown = (e: any) => {
  setDragging(true)
  handleColor(e)
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
  <div class="pos-relative">
    <div class="pos-relative" @mouseup="stopDragging" @touchend="stopDragging" @mousedown="handleCanvasDown" @touchstart="handleCanvasDown" @mousemove="handleMove">
      <div :style="[defaultStyles.rbgcpHandle, { transform: `translate(${dragPos?.x || 0}px, ${dragPos?.y || 0}px)` }, dragging && { transition: '' }]" @mousedown="handleMouseDown" />
      <div :style="{ ...defaultStyles.rbgcpCanvasWrapper, height: squareHeight + 'px' }" @click="handleClick">
        <canvas ref="canvas" id="paintSquare" :width="`${squareWidth}px`" :height="`${squareHeight}px`" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
