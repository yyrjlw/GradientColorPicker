<script setup lang="ts">
import { inject, ref } from 'vue'
import { pickerContextProvide } from '../provide'
import html2canvas from 'html2canvas'
import tc from 'tinycolor2'
import { controlBtnStyles } from '@/styles/styles'
import DropperIcon from './DropperIcon'

const emits = defineEmits<{
  select: [string]
}>()

const { defaultStyles } = inject(pickerContextProvide)!

const pickerCanvas = ref<CanvasRenderingContext2D | null>()
const coverUp = ref<boolean>(false)
const isPicking = ref<boolean>(false)

const takePick = () => {
  const root = document.getElementById('root')
  coverUp.value = true

  // @ts-expect-error some error with this imported packages types
  html2canvas(root).then((canvas: any) => {
    const blankCanvas = document.createElement('canvas')
    const ctx = blankCanvas.getContext('2d', { willReadFrequently: true })

    if (root && ctx) {
      blankCanvas.width = root.offsetWidth * 2
      blankCanvas.height = root.offsetHeight * 2
      ctx.drawImage(canvas, 0, 0)
    }

    pickerCanvas.value = ctx
  })
}

const getColorLegacy = (e: any) => {
  e.stopPropagation()
  if (pickerCanvas.value) {
    const { pageX, pageY } = e
    const x1 = pageX * 2
    const y1 = pageY * 2
    const rgb = pickerCanvas.value.getImageData(x1, y1, 1, 1).data
    emits('select', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`)
  }
  isPicking.value = false
  coverUp.value = false
}

const getEyeDrop = () => {
  isPicking.value = true
  // @ts-expect-error - ts does not evaluate for window.EyeDropper
  if (!window.EyeDropper) {
    takePick()
  } else {
    // @ts-expect-error - ts does not evaluate for window.EyeDropper
    const eyeDropper = new window.EyeDropper()
    const abortController = new window.AbortController()

    eyeDropper
      .open({ signal: abortController.signal })
      .then((result: any) => {
        const tinyHex = tc(result.sRGBHex)
        const { r, g, b } = tinyHex.toRgb()
        emits('select', `rgba(${r}, ${g}, ${b}, 1)`)
        isPicking.value = false
      })
      .catch((e: any) => {
        console.log(e)
        isPicking.value = false
      })
  }
}
</script>

<template>
  <div>
    <div
      id="rbgcp-eyedropper-btn"
      :style="{
        ...defaultStyles.rbgcpEyedropperBtn,
        ...controlBtnStyles(coverUp, defaultStyles)
      }"
      @click="getEyeDrop">
      <DropperIcon :color="isPicking ? 'rgb(86, 140, 245)' : ''" />
    </div>

    <Teleport to="body" v-if="coverUp">
      <div @click="getColorLegacy" :style="defaultStyles.rbgcpEyedropperCover" />
    </Teleport>
  </div>
</template>

<style scoped></style>
