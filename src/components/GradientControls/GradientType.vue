<script setup lang="ts">
import { computed, inject } from 'vue'
import { pickerContextProvide } from '../provide'
import { LinearIcon, RadialIcon } from '../icon'

const { gradientType, onChange, value, defaultStyles } = inject(pickerContextProvide)!

const isLinear = computed(() => gradientType.value === 'linear-gradient')
const isRadial = computed(() => gradientType.value === 'radial-gradient')

const handleLinear = () => {
  const remaining = value.value.split(/,(.+)/)[1]
  onChange(`linear-gradient(90deg, ${remaining}`)
}

const handleRadial = () => {
  const remaining = value.value.split(/,(.+)/)[1]
  onChange(`radial-gradient(circle, ${remaining}`)
}
</script>

<template>
  <div :style="defaultStyles.rbgcpControlBtnWrapper">
    <div @click="handleLinear" id="rbgcp-linear-btn" :style="{ ...defaultStyles.rbgcpControlBtn, ...(isLinear && defaultStyles.rbgcpControlBtnSelected) }" tabIndex="{0}" role="button">
      <LinearIcon :color="isLinear ? '#568CF5' : ''" />
    </div>
    <div id="rbgcp-radial-btn" :style="{ ...defaultStyles.rbgcpControlBtn, ...(isRadial && defaultStyles.rbgcpControlBtnSelected) }" tabIndex="{0}" role="button" @click="handleRadial">
      <RadialIcon :color="isRadial ? '#568CF5' : ''" />
    </div>
  </div>
</template>

<style scoped></style>
