<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import { pickerContextProvide } from '../provide'
import { usePaintSat, usePaintLight, usePaintBright } from '@/hooks/usePaintHue'
import tinycolor from 'tinycolor2'
import AdvBar from './AdvBar.vue'

defineOptions({
  name: 'AdvancedControls'
})
defineProps<{ openAdvanced: boolean }>()
const { tinyColor, handleChange, squareWidth, hc } = inject(pickerContextProvide)!

const s = computed(() => tinyColor.value.toHsl().s)
const l = computed(() => tinyColor.value.toHsl().l)
const h = computed(() => hc.value?.h)
const a = computed(() => hc.value?.a)
const v = computed(() => hc.value?.v)

const satRef = ref<InstanceType<typeof AdvBar>>()
const lightRef = ref<InstanceType<typeof AdvBar>>()
const brightRef = ref<InstanceType<typeof AdvBar>>()

onMounted(() => {
  usePaintSat(
    satRef.value!.canvasRef!,
    h,
    computed(() => l.value * 100),
    squareWidth
  )
  usePaintLight(
    lightRef.value!.canvasRef!,
    h,
    computed(() => s.value * 100),
    squareWidth
  )
  usePaintBright(
    brightRef.value!.canvasRef!,
    h,
    computed(() => s.value * 100),
    squareWidth
  )
})

const satDesat = (value: number) => {
  const { r, g, b } = tinycolor({ h: h.value!, s: value / 100, l: l.value }).toRgb()
  handleChange(`rgba(${r},${g},${b},${a.value})`)
}

const setLight = (value: number) => {
  const { r, g, b } = tinycolor({ h: h.value!, s: s.value, l: value / 100 }).toRgb()
  handleChange(`rgba(${r},${g},${b},${a.value})`)
}

const setBright = (value: number) => {
  const { r, g, b } = tinycolor({
    h: h.value!,
    s: s.value * 100,
    v: value
  }).toRgb()
  console.log('s.value * 100: ', s.value * 100)
  handleChange(`rgba(${r},${g},${b},${a.value})`)
}
</script>

<template>
  <div
    :style="{
      height: openAdvanced ? 98 + 'px' : 0,
      width: '100%',
      transition: 'all 120ms linear'
    }">
    <div
      :style="{
        paddingTop: 11 + 'px',
        display: openAdvanced ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: openAdvanced ? 98 + 'px' : 0,
        overflow: 'hidden',
        transition: 'height 100ms linear'
      }">
      <AdvBar :value="s" ref="satRef" :callback="satDesat" :openAdvanced="openAdvanced" label="Saturation" />
      <AdvBar :value="l" ref="lightRef" label="Lightness" :callback="setLight" :openAdvanced="openAdvanced" />
      <AdvBar :value="v" ref="brightRef" label="Brightness" :callback="setBright" :openAdvanced="openAdvanced" />
    </div>
  </div>
</template>

<style scoped></style>
