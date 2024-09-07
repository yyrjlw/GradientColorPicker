# @yyrjlw/vue-gradient-color-picker

This component is a "translation" of [react-best-gradient-color-picker](https://www.npmjs.com/package/react-best-gradient-color-picker) for Vue.

## Installation

```
npm install @yyrjlw/vue-gradient-color-picker
```

## Example

```vue
<template>
  <color-picker v-model="colorValue" />
</template>

<script lang="ts" setup>
import ColorPicker from '@yyrjlw/vue-gradient-color-picker'
import { ref } from 'vue'

const colorValue = ref('')
</script>
```

## Props

For detailed props information, please refer to https://github.com/hxf31891/react-gradient-color-picker?tab=readme-ov-file#props

## Differences

| Original Component                                                                                          | Vue Component       |
| ----------------------------------------------------------------------------------------------------------- | ------------------- |
| [API > onChange](https://github.com/hxf31891/react-gradient-color-picker?tab=readme-ov-file#api)            | v-model             |
| [useColorPicker](https://github.com/hxf31891/react-gradient-color-picker?tab=readme-ov-file#usecolorpicker) | Not yet implemented |

## Demo

[Demo link](https://gradientcolorpicker.pages.dev/)
