# @yyrjlw/vue-gradient-color-picker

该组件“翻译”自[react-best-gradient-color-picker](https://www.npmjs.com/package/react-best-gradient-color-picker)

## 安装

```
npm install @yyrjlw/vue-gradient-color-picker
```

## 示例

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

## 参数

详见https://github.com/hxf31891/react-gradient-color-picker?tab=readme-ov-file#props

## 不同之处

| 源组件                                                                                                      | Vue 组件 |
| ----------------------------------------------------------------------------------------------------------- | -------- |
| [API > onChange](https://github.com/hxf31891/react-gradient-color-picker?tab=readme-ov-file#api)            | v-model  |
| [useColorPicker](https://github.com/hxf31891/react-gradient-color-picker?tab=readme-ov-file#usecolorpicker) | 暂未实现 |
