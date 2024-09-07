<script setup lang="ts">
import { computed, inject, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { pickerContextProvide } from '../provide'
import { getHandleValue } from '@/utils/utils'

defineOptions({
  name: 'AdvBar'
})
const props = defineProps<{ value: number; callback: (arg0: number) => void; openAdvanced: boolean; label: string }>()
const { squareWidth, defaultStyles } = inject(pickerContextProvide)!

const dragging = ref(false)
const handleTop = ref(2)

const left = computed(() => props.value * (squareWidth.value - 18) + 'px')

const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  watch([() => props.openAdvanced], async () => {
    await nextTick()
    handleTop.value = canvasRef.value!.offsetTop - 2
  })
})

const stopDragging = () => {
  dragging.value = false
}

const handleMove = (e: any) => {
  if (dragging.value) {
    props.callback(getHandleValue(e))
  }
}

const handleClick = (e: any) => {
  if (!dragging.value) {
    props.callback(getHandleValue(e))
  }
}

const handleDown = () => {
  dragging.value = true
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

defineExpose({
  canvasRef
})
</script>

<template>
  <div class="w-full p-y-3px p-x-0">
    <div class="relative cursor-ew-resize" @mousemove="handleMove">
      <div :style="{ left, top: handleTop + 'px', ...defaultStyles.rbgcpHandle }" @mousedown="handleDown" role="button" tabIndex="0" />
      <div
        :style="{
          textAlign: 'center',
          color: '#fff',
          fontSize: 12 + 'px',
          fontWeight: 500,
          lineHeight: 1,
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          top: handleTop + 2 + 'px',
          zIndex: 10,
          textShadow: '1px 1px 1px rgba(0,0,0,.6)'
        }"
        @mousemove="handleMove"
        @click="handleClick"
        tabIndex="0"
        role="button">
        {{ label }}
      </div>
      <canvas ref="canvasRef" height="14px" :width="`${squareWidth}px`" @click="handleClick" class="pos-relative rounded-14px" />
    </div>
  </div>
</template>

<style scoped></style>
