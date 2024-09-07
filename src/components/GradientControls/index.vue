<script setup lang="ts">
import { inject } from 'vue'
import { pickerContextProvide } from '../provide'
import GradientType from './GradientType.vue'
import DegreePicker from './DegreePicker.vue'
import StopPicker from './StopPicker.vue'
import DeleteBtn from './DeleteBtn.vue'

defineProps<{
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
}>()

const { gradientType, defaultStyles } = inject(pickerContextProvide)!
</script>

<template>
  <div
    :style="{
      ...defaultStyles.rbgcpControlBtnWrapper,
      marginTop: 12 + 'px',
      marginBottom: -4 + 'px',
      justifyContent: 'space-between',
      paddingLeft: hideGradientType ? 4 + 'px' : 0
    }"
    id="rbgcp-gradient-controls-wrap">
    <GradientType v-if="!hideGradientType" />
    <div style="width: 53px">
      <DegreePicker v-if="!hideGradientAngle && gradientType === 'linear-gradient'" />
    </div>
    <StopPicker v-if="!hideGradientStop" />
    <DeleteBtn />
  </div>
</template>

<style scoped></style>
