import { defineComponent, inject } from 'vue'
import { fakePresets } from '../constants'
import { pickerContextProvide } from './provide'

const Presets = defineComponent({
  props: {
    presets: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { value, onChange, handleChange, squareWidth } = inject(pickerContextProvide)!

    const getPresets = () => {
      if (props.presets?.length > 0) {
        return props.presets?.slice(0, 18)
      } else {
        return fakePresets
      }
    }

    const handlePresetClick = (preset: string) => {
      if (preset?.includes('gradient')) {
        onChange(preset)
      } else {
        handleChange(preset)
      }
    }

    return () => (
      <div class="flex mt-14px justify-between">
        <div
          class="size-50px rounded-md flex-shrink-0"
          style={{
            background: value.value
          }}
        />
        <div
          class="flex flex-wrap justify-between"
          style={{
            width: squareWidth.value - 66 + 'px'
          }}>
          {getPresets().map((p: any, key: number) => (
            <div
              key={`${p}-${key}`}
              class="h-23px w-10.2% rounded mb-2px"
              style={{
                background: p,
                border: p === 'rgba(255,255,255, 1)' ? '1px solid #96959c' : ''
              }}
              onClick={() => handlePresetClick(p)}
            />
          ))}
        </div>
      </div>
    )
  }
})

export default Presets
