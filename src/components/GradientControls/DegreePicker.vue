<script setup lang="ts">
import { computed, inject } from 'vue'
import { pickerContextProvide } from '../provide'
import { DegreesIcon } from '../icon'
import { formatInputValues } from '@/utils/formatters'

const { degrees, onChange, value, defaultStyles } = inject(pickerContextProvide)!

const handleDegrees = (e: any) => {
  const newValue = formatInputValues(e.target.value, 0, 360)
  const remaining = value.value.split(/,(.+)/)[1]
  onChange(`linear-gradient(${newValue || 0}deg, ${remaining}`)
}
</script>

<template>
  <div
    :style="{
      ...defaultStyles.rbgcpControlBtnWrapper,
      ...defaultStyles.rbgcpControlInputWrap,
      ...defaultStyles.rbgcpDegreeInputWrap
    }">
    <DegreesIcon />
    <input
      :value="degrees"
      id="rbgcp-degree-input"
      @change="handleDegrees"
      :style="{
        ...defaultStyles.rbgcpControlInput,
        ...defaultStyles.rbgcpDegreeInput
      }" />
    <div
      :style="{
        ...defaultStyles.rbgcpDegreeIcon,
        position: 'absolute',
        right: degrees > 99 ? 0 : degrees < 10 ? 7 + 'px' : 3 + 'px',
        top: 1 + 'px',
        fontWeight: 400,
        fontSize: 13 + 'px'
      }">
      °
    </div>
  </div>
</template>

<style scoped></style>
