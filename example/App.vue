<script setup lang="ts">
import { ref } from 'vue'
import ColorPicker from '../src'
const color = ref()
</script>

<template>
  <div class="h-full flex justify-center items-center" :style="{ background: color }">
    <ColorPicker v-model="color" />
  </div>
</template>

<style lang="scss"></style>
