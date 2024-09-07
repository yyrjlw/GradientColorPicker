<script setup lang="ts">
import { inject } from 'vue'
import { pickerContextProvide } from '../provide'
import type { LocalesProps } from '@/shared/types'
import { colorTypeBtnStyles } from '@/styles/styles'

defineProps<{
  hideColorTypeBtns?: boolean
  isGradient?: boolean
  setSolid: () => void
  setGradient: () => void
  locales?: LocalesProps
}>()

const { defaultStyles } = inject(pickerContextProvide)!
</script>

<template>
  <div v-if="hideColorTypeBtns" class="w-1px"></div>
  <div v-else class="flex items-center" :style="defaultStyles.rbgcpControlBtnWrapper">
    <div id="rbgcp-solid-btn" :style="colorTypeBtnStyles(!isGradient, defaultStyles)" @click="setSolid">{{ locales?.CONTROLS?.SOLID }}</div>
    <div id="rbgcp-gradient-btn" :style="colorTypeBtnStyles(isGradient || false, defaultStyles)" @click="setGradient">
      {{ locales?.CONTROLS?.GRADIENT }}
    </div>
  </div>
</template>

<style scoped></style>
