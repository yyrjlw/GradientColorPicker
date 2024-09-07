<script setup lang="ts">
import { inject } from 'vue'
import { pickerContextProvide } from '../provide'

defineOptions({
  name: 'ComparibleColors'
})
defineProps<{ openComparibles: boolean }>()

const { tinyColor, handleChange, defaultStyles } = inject(pickerContextProvide)!

const handleClick = (tiny: any) => {
  const { r, g, b, a } = tiny.toRgb()
  handleChange(`rgba(${r},${g},${b},${a})`)
}
</script>

<template>
  <div
    :style="{
      height: openComparibles ? 216 + 'px' : 0,
      width: '100%',
      transition: 'all 120ms linear'
    }">
    <div
      class="pt-11px pos-relative"
      :style="{
        display: openComparibles ? '' : 'none'
      }">
      <div class="text-center text-13px font-600 pos-absolute top-6.5px left-2px" :style="defaultStyles.rbgcpComparibleLabel">Color Guide</div>
      <div class="text-center text-12px font-500 mt-3px" :style="defaultStyles.rbgcpComparibleLabel">Analogous</div>
      <div class="rounded overflow-hidden flex">
        <div v-for="(c, key) in tinyColor.analogous()" :key="key" class="w-20% h-30px" :style="{ background: c.toHexString() }" @click="handleClick(c)" />
      </div>
      <div class="text-center text-12px font-500 mt-3px" :style="defaultStyles.rbgcpComparibleLabel">Monochromatic</div>
      <div class="rounded overflow-hidden flex justify-end">
        <div v-for="(c, key) in tinyColor.monochromatic()" :key="key" class="w-20% h-30px" :style="{ background: c.toHexString() }" @click="handleClick(c)" />
      </div>
      <div class="text-center text-12px font-500 mt-3px" :style="defaultStyles.rbgcpComparibleLabel">Triad</div>
      <div class="rounded overflow-hidden flex justify-end">
        <div
          v-for="(c, key) in tinyColor.triad()"
          :key="key"
          :style="{
            width: 'calc(100% / 3)',
            height: 28 + 'px',
            background: c.toHexString()
          }"
          @click="handleClick(c)" />
      </div>
      <div class="text-center text-12px font-500 mt-3px" :style="defaultStyles.rbgcpComparibleLabel">Tetrad</div>
      <div class="rounded overflow-hidden flex justify-end">
        <div v-for="(c, key) in tinyColor.tetrad()" :key="key" class="w-25% h-28px" :style="{ background: c.toHexString() }" @click="handleClick(c)" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
