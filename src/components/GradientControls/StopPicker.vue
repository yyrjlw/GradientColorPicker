<script setup lang="ts">
import { inject } from 'vue'
import { pickerContextProvide } from '../provide'
import { StopIcon } from '../icon'
import { formatInputValues } from '@/utils/formatters'

const { currentLeft, handleGradient, currentColor, defaultStyles } = inject(pickerContextProvide)!

const handleMove = (newVal: string) => {
  handleGradient(currentColor.value, formatInputValues(parseInt(newVal), 0, 100))
}
</script>

<template>
  <div
    :style="{
      ...defaultStyles.rbgcpControlBtnWrapper,
      ...defaultStyles.rbgcpControlInputWrap,
      ...defaultStyles.rbgcpStopInputWrap,
      paddingLeft: 8 + 'px'
    }">
    <StopIcon />
    <input
      :value="currentLeft"
      id="rbgcp-stop-input"
      @change="handleMove(($event.target! as HTMLInputElement).value)"
      :style="{ ...defaultStyles.rbgcpControlInput, ...defaultStyles.rbgcpStopInput }" />
  </div>
</template>

<style scoped></style>
